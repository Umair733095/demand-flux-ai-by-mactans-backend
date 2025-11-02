import sys, json, pandas as pd, numpy as np, subprocess
from prophet import Prophet

try:
    file_path = sys.argv[1]
    df = pd.read_csv(file_path)
    df.columns = df.columns.str.lower()

    if len(df) < 30:
        raise ValueError("Dataset too small for forecasting. Please upload at least 30 days of data.")

    df['date'] = pd.to_datetime(df['date'])

    # === 1️⃣ Model Validation ===
    try:
        result = subprocess.run(
            ["python", "./ml/validate_model.py", file_path],
            capture_output=True, text=True, check=True
        )
        val_output = json.loads(result.stdout)
        model_accuracy = float(val_output["model_accuracy"].replace("%", ""))
    except Exception as e:
        model_accuracy = 0
        print(f"⚠️ Validation failed: {e}")

    confidence_level = "High" if model_accuracy >= 85 else "Medium" if model_accuracy >= 70 else "Low"

    # === 2️⃣ Prophet Forecast ===
    data = df[['date', 'demand']].rename(columns={'date': 'ds', 'demand': 'y'})
    model = Prophet()
    model.fit(data)
    future = model.make_future_dataframe(periods=90)
    forecast = model.predict(future)

    # === 3️⃣ Stats ===
    avg_demand = df['demand'].mean()
    std_demand = df['demand'].std()
    lead_time = df['lead_time'].mean() if 'lead_time' in df.columns else 1

    # === 4️⃣ Costs ===
    price_per_unit = df['price_per_unit'].mean() if 'price_per_unit' in df.columns else 50
    cost_per_unit = df['cost_per_unit'].mean() if 'cost_per_unit' in df.columns else 40
    holding_cost = df['holding_cost'].mean() if 'holding_cost' in df.columns else 0.02 * price_per_unit
    stockout_cost = df['stockout_cost'].mean() if 'stockout_cost' in df.columns else 0.10 * price_per_unit

    # === 5️⃣ Optimal Inventory ===
    best_cost, best_level = float('inf'), 0
    for level in range(int(avg_demand - 2 * std_demand), int(avg_demand + 3 * std_demand)):
        total_cost = 0
        for d in forecast['yhat'][:90]:
            if level > d:
                total_cost += holding_cost * (level - d)
            else:
                total_cost += stockout_cost * (d - level)
        if total_cost < best_cost:
            best_cost, best_level = total_cost, level

    # === 6️⃣ Safety Stock & Reorder Point ===
    Z = 1.65
    safety_stock = round(Z * std_demand * np.sqrt(lead_time), 2)
    reorder_point = round((avg_demand * lead_time) + safety_stock, 2)

    # === 7️⃣ Profit Function ===
    def calc_profit(demand, inventory_level):
        sold = min(demand, inventory_level)
        revenue = sold * price_per_unit
        holding = holding_cost * max(0, inventory_level - demand)
        stockout = stockout_cost * max(0, demand - inventory_level)
        profit = revenue - (sold * cost_per_unit) - holding - stockout
        return profit

    # === 8️⃣ Normalize Profit → Band Offset ===
    all_profits = [calc_profit(x, best_level) for x in df['demand']]
    all_profits += [calc_profit(y, best_level) for y in forecast['yhat'][:90]]
    profit_min, profit_max = min(all_profits), max(all_profits)

    def profit_to_band(demand, profit):
        # normalize profit -1 to +1
        norm = (profit - profit_min) / (profit_max - profit_min + 1e-6)
        norm = (norm - 0.5) * 2  # scale to -1 → +1
        effect = norm * (0.25 * avg_demand)  # 25% amplitude
        return demand + effect

    # === 9️⃣ Actual Data ===
    actual_data = []
    for _, row in df.iterrows():
        profit = calc_profit(row['demand'], best_level)
        band = profit_to_band(row['demand'], profit)
        actual_data.append({
            "ds": row['date'].strftime('%Y-%m-%d'),
            "y": row['demand'],
            "optimal_stock": round(best_level, 2),
            "daily_profit": round(profit, 2),
            "profit_band": round(band, 2)
        })

    # === 🔟 Forecast Data ===
    forecast_data = []
    for _, row in forecast.tail(90).iterrows():
        profit = calc_profit(row['yhat'], best_level)
        band = profit_to_band(row['yhat'], profit)
        forecast_data.append({
            "ds": row['ds'].strftime('%Y-%m-%d'),
            "yhat": round(row['yhat'], 2),
            "yhat_lower": round(row['yhat_lower'], 2),
            "yhat_upper": round(row['yhat_upper'], 2),
            "optimal_stock": round(best_level, 2),
            "daily_profit": round(profit, 2),
            "profit_band": round(band, 2)
        })

    # === 1️⃣1️⃣ Cost Summary ===
    avg_inventory = df['inventory'].mean() if 'inventory' in df.columns else avg_demand
    avg_holding = df['holding_cost'].mean() if 'holding_cost' in df.columns else holding_cost
    avg_stockout = df['stockout_cost'].mean() if 'stockout_cost' in df.columns else stockout_cost

    previous_cost = (avg_inventory * avg_holding) + max(0, (avg_demand - avg_inventory)) * avg_stockout
    optimized_cost = (best_level * avg_holding) + (safety_stock * avg_stockout * 0.2)
    expected_savings = round(((previous_cost - optimized_cost) / previous_cost) * 100, 2)
    expected_savings = min(max(expected_savings, 5), 80)

    # === ✅ Final Response ===
    response = {
        "actual": actual_data,
        "forecast": forecast_data,
        "average_demand": round(avg_demand, 2),
        "safety_stock": safety_stock,
        "reorder_point": reorder_point,
        "optimal_stock": round(best_level, 2),
        "previous_cost_per_day": round(previous_cost, 2),
        "optimized_cost_per_day": round(optimized_cost, 2),
        "expected_savings": f"{expected_savings}%",
        "model_accuracy": f"{round(model_accuracy, 2)}%",
        "confidence_level": confidence_level
    }

    print(json.dumps(response, default=str))

except Exception as e:
    print(json.dumps({"error": str(e)}))
