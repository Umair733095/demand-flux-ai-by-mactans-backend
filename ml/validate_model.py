import sys, json, pandas as pd
from prophet import Prophet
from sklearn.metrics import mean_absolute_percentage_error

try:
    # === 1️⃣ Read and prepare CSV ===
    file_path = sys.argv[1]
    df = pd.read_csv(file_path)
    df.columns = df.columns.str.lower()
    df['date'] = pd.to_datetime(df['date'])

    if len(df) < 30:
        raise ValueError("Not enough data for validation — need at least 30 data points.")

    # === 2️⃣ Prepare Prophet-compatible columns ===
    data = df[['date', 'demand']].rename(columns={'date': 'ds', 'demand': 'y'})

    # === 3️⃣ Dynamic 75 % train / 25 % test split ===
    split_index = int(len(data) * 0.75)
    train = data.iloc[:split_index]
    test = data.iloc[split_index:]
    forecast_horizon = len(test)

    # === 4️⃣ Train Prophet on train set ===
    model = Prophet()
    model.fit(train)

    # === 5️⃣ Forecast same length as test set ===
    future = model.make_future_dataframe(periods=forecast_horizon)
    forecast = model.predict(future)

    # === 6️⃣ Compare forecast vs. actual test data ===
    merged = forecast[['ds', 'yhat']].merge(test, on='ds', how='inner')
    mape = mean_absolute_percentage_error(merged['y'], merged['yhat']) * 100
    accuracy = round(100 - mape, 2)

    # === 7️⃣ Output result ===
    print(json.dumps({
        "model_accuracy": f"{accuracy}%",
        "train_points": len(train),
        "test_points": len(test)
    }))

except Exception as e:
    print(json.dumps({"error": str(e)}))
