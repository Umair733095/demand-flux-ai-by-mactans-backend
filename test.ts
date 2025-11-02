import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
} from "recharts";

interface ForecastChartProps {
  forecastData?: {
    actual: { ds: string; y: number }[];
    forecast: { ds: string; yhat: number; yhat_lower: number; yhat_upper: number }[];
    optimal_stock: number;
    reorder_point: number;
  };
}

// 🧠 Default fallback demo data
const demoData = {
  actual: [
       {
            "ds": "2024-11-01",
            "y": 184
        },
        {
            "ds": "2024-11-02",
            "y": 187
        },
        {
            "ds": "2024-11-03",
            "y": 169
        },
        {
            "ds": "2024-11-04",
            "y": 174
        },
        {
            "ds": "2024-11-05",
            "y": 177
        },
        {
            "ds": "2024-11-06",
            "y": 183
        },
        {
            "ds": "2024-11-07",
            "y": 171
        },
        {
            "ds": "2024-11-08",
            "y": 176
        },
        {
            "ds": "2024-11-09",
            "y": 171
        },
        {
            "ds": "2024-11-10",
            "y": 149
        },
        {
            "ds": "2024-11-11",
            "y": 170
        },
        {
            "ds": "2024-11-12",
            "y": 165
        },
        {
            "ds": "2024-11-13",
            "y": 159
        },
        {
            "ds": "2024-11-14",
            "y": 152
        },
        {
            "ds": "2024-11-15",
            "y": 158
        },
        {
            "ds": "2024-11-16",
            "y": 167
        },
        {
            "ds": "2024-11-17",
            "y": 154
        },
        {
            "ds": "2024-11-18",
            "y": 153
        },
        {
            "ds": "2024-11-19",
            "y": 155
        },
        {
            "ds": "2024-11-20",
            "y": 152
        },
        {
            "ds": "2024-11-21",
            "y": 160
        },
        {
            "ds": "2024-11-22",
            "y": 153
        },
        {
            "ds": "2024-11-23",
            "y": 149
        },
        {
            "ds": "2024-11-24",
            "y": 159
        },
        {
            "ds": "2024-11-25",
            "y": 172
        },
        {
            "ds": "2024-11-26",
            "y": 155
        },
        {
            "ds": "2024-11-27",
            "y": 161
        },
        {
            "ds": "2024-11-28",
            "y": 247
        },
        {
            "ds": "2024-11-29",
            "y": 167
        },
        {
            "ds": "2024-11-30",
            "y": 182
        },
        {
            "ds": "2024-12-01",
            "y": 173
        },
        {
            "ds": "2024-12-02",
            "y": 271
        },
        {
            "ds": "2024-12-03",
            "y": 185
        },
        {
            "ds": "2024-12-04",
            "y": 137
        },
        {
            "ds": "2024-12-05",
            "y": 182
        },
        {
            "ds": "2024-12-06",
            "y": 190
        },
        {
            "ds": "2024-12-07",
            "y": 173
        },
        {
            "ds": "2024-12-08",
            "y": 191
        },
        {
            "ds": "2024-12-09",
            "y": 164
        },
        {
            "ds": "2024-12-10",
            "y": 170
        },
        {
            "ds": "2024-12-11",
            "y": 178
        },
        {
            "ds": "2024-12-12",
            "y": 158
        },
        {
            "ds": "2024-12-13",
            "y": 169
        },
        {
            "ds": "2024-12-14",
            "y": 166
        },
        {
            "ds": "2024-12-15",
            "y": 158
        },
        {
            "ds": "2024-12-16",
            "y": 164
        },
        {
            "ds": "2024-12-17",
            "y": 215
        },
        {
            "ds": "2024-12-18",
            "y": 150
        },
        {
            "ds": "2024-12-19",
            "y": 160
        },
        {
            "ds": "2024-12-20",
            "y": 144
        },
        {
            "ds": "2024-12-21",
            "y": 178
        },
        {
            "ds": "2024-12-22",
            "y": 168
        },
        {
            "ds": "2024-12-23",
            "y": 165
        },
        {
            "ds": "2024-12-24",
            "y": 159
        },
        {
            "ds": "2024-12-25",
            "y": 166
        },
        {
            "ds": "2024-12-26",
            "y": 166
        },
        {
            "ds": "2024-12-27",
            "y": 170
        },
        {
            "ds": "2024-12-28",
            "y": 183
        },
        {
            "ds": "2024-12-29",
            "y": 180
        },
        {
            "ds": "2024-12-30",
            "y": 183
        },
        {
            "ds": "2024-12-31",
            "y": 177
        }
    ],
    "forecast": [
        {
            "ds": "2025-01-01",
            "yhat": 172.74805174529706,
            "yhat_lower": 143.32382075054844,
            "yhat_upper": 199.72590259993254
        },
        {
            "ds": "2025-01-02",
            "yhat": 177.1281345757723,
            "yhat_lower": 148.54034262599987,
            "yhat_upper": 207.04388277527755
        },
        {
            "ds": "2025-01-03",
            "yhat": 172.57098730211823,
            "yhat_lower": 143.65998738876513,
            "yhat_upper": 200.87840035313127
        },
        {
            "ds": "2025-01-04",
            "yhat": 174.8100730611417,
            "yhat_lower": 147.21286703513587,
            "yhat_upper": 203.73468048759224
        },
        {
            "ds": "2025-01-05",
            "yhat": 173.45463436878435,
            "yhat_lower": 145.59194928408485,
            "yhat_upper": 203.65471114837106
        },
        {
            "ds": "2025-01-06",
            "yhat": 172.16135254289668,
            "yhat_lower": 142.52590632723158,
            "yhat_upper": 203.46066342702633
        },
        {
            "ds": "2025-01-07",
            "yhat": 173.3951037671019,
            "yhat_lower": 144.0514831080269,
            "yhat_upper": 203.62471104561587
        },
        {
            "ds": "2025-01-08",
            "yhat": 173.21313085779067,
            "yhat_lower": 144.40303729152507,
            "yhat_upper": 199.80252728283003
        },
        {
            "ds": "2025-01-09",
            "yhat": 177.59321368827725,
            "yhat_lower": 148.66615410025693,
            "yhat_upper": 207.13915939944627
        },
        {
            "ds": "2025-01-10",
            "yhat": 173.03606641461613,
            "yhat_lower": 143.61294899487729,
            "yhat_upper": 200.87929704671294
        },
        {
            "ds": "2025-01-11",
            "yhat": 175.27515217365246,
            "yhat_lower": 148.09560657393018,
            "yhat_upper": 203.59429544841146
        },
        {
            "ds": "2025-01-12",
            "yhat": 173.9197134812896,
            "yhat_lower": 142.53674955381757,
            "yhat_upper": 203.80287470207801
        },
        {
            "ds": "2025-01-13",
            "yhat": 172.62643165540803,
            "yhat_lower": 139.95458627932683,
            "yhat_upper": 199.88207181173667
        },
        {
            "ds": "2025-01-14",
            "yhat": 173.86018287959828,
            "yhat_lower": 144.35292556964237,
            "yhat_upper": 202.98317182677744
        },
        {
            "ds": "2025-01-15",
            "yhat": 173.67820997029423,
            "yhat_lower": 146.664886323142,
            "yhat_upper": 202.87713172283372
        },
        {
            "ds": "2025-01-16",
            "yhat": 178.0582928007797,
            "yhat_lower": 149.1944475035108,
            "yhat_upper": 204.08597662856354
        },
        {
            "ds": "2025-01-17",
            "yhat": 173.50114552712466,
            "yhat_lower": 143.09913854261367,
            "yhat_upper": 201.98271207111551
        },
        {
            "ds": "2025-01-18",
            "yhat": 175.7402312861341,
            "yhat_lower": 147.946537921081,
            "yhat_upper": 204.75774800507654
        },
        {
            "ds": "2025-01-19",
            "yhat": 174.38479259379488,
            "yhat_lower": 143.78991904950936,
            "yhat_upper": 202.3213773225221
        },
        {
            "ds": "2025-01-20",
            "yhat": 173.09151076791332,
            "yhat_lower": 144.0750709782272,
            "yhat_upper": 201.88772141256254
        },
        {
            "ds": "2025-01-21",
            "yhat": 174.32526199209468,
            "yhat_lower": 144.50242987174224,
            "yhat_upper": 203.55305526214573
        },
        {
            "ds": "2025-01-22",
            "yhat": 174.14328908280334,
            "yhat_lower": 147.5185345636898,
            "yhat_upper": 202.03024305787164
        },
        {
            "ds": "2025-01-23",
            "yhat": 178.52337191328235,
            "yhat_lower": 149.396958893505,
            "yhat_upper": 207.7050192737714
        },
        {
            "ds": "2025-01-24",
            "yhat": 173.96622463962257,
            "yhat_lower": 143.77872517850003,
            "yhat_upper": 202.84332384951279
        },
        {
            "ds": "2025-01-25",
            "yhat": 176.20531039864358,
            "yhat_lower": 148.59059812009764,
            "yhat_upper": 204.9918857150273
        },
        {
            "ds": "2025-01-26",
            "yhat": 174.84987170630018,
            "yhat_lower": 145.76088741355426,
            "yhat_upper": 205.93744296017587
        },
        {
            "ds": "2025-01-27",
            "yhat": 173.55658988042467,
            "yhat_lower": 143.0876804410163,
            "yhat_upper": 202.96520008522847
        },
        {
            "ds": "2025-01-28",
            "yhat": 174.79034110461083,
            "yhat_lower": 145.11748084731357,
            "yhat_upper": 203.79892486419448
        },
        {
            "ds": "2025-01-29",
            "yhat": 174.60836819530135,
            "yhat_lower": 148.36786896343244,
            "yhat_upper": 204.8181655211514
        },
        {
            "ds": "2025-01-30",
            "yhat": 178.98845102578497,
            "yhat_lower": 150.74801084953276,
            "yhat_upper": 207.08823715450507
        },
        {
            "ds": "2025-01-31",
            "yhat": 174.43130375213136,
            "yhat_lower": 145.8502442326563,
            "yhat_upper": 203.83397860185508
        },
        {
            "ds": "2025-02-01",
            "yhat": 176.6703895111446,
            "yhat_lower": 148.2589393709235,
            "yhat_upper": 205.4230931398546
        },
        {
            "ds": "2025-02-02",
            "yhat": 175.3149508187933,
            "yhat_lower": 147.6910007247753,
            "yhat_upper": 204.56760164804075
        },
        {
            "ds": "2025-02-03",
            "yhat": 174.02166899292376,
            "yhat_lower": 144.5967293440109,
            "yhat_upper": 200.52927421915587
        },
        {
            "ds": "2025-02-04",
            "yhat": 175.25542021710166,
            "yhat_lower": 146.21269216270974,
            "yhat_upper": 202.84339747488968
        },
        {
            "ds": "2025-02-05",
            "yhat": 175.0734473078005,
            "yhat_lower": 146.84202490507465,
            "yhat_upper": 204.8389661523332
        },
        {
            "ds": "2025-02-06",
            "yhat": 179.45353013828762,
            "yhat_lower": 150.11188959409952,
            "yhat_upper": 207.83752814755994
        },
        {
            "ds": "2025-02-07",
            "yhat": 174.89638286462926,
            "yhat_lower": 142.85049546601178,
            "yhat_upper": 203.3619615625089
        },
        {
            "ds": "2025-02-08",
            "yhat": 177.13546862365536,
            "yhat_lower": 148.55395805832651,
            "yhat_upper": 206.90466925877953
        },
        {
            "ds": "2025-02-09",
            "yhat": 175.78002993131074,
            "yhat_lower": 147.57845470560508,
            "yhat_upper": 204.99314286011378
        },
        {
            "ds": "2025-02-10",
            "yhat": 174.4867481054229,
            "yhat_lower": 145.50413876746282,
            "yhat_upper": 205.06548725117722
        },
        {
            "ds": "2025-02-11",
            "yhat": 175.7204993296178,
            "yhat_lower": 148.11327094170886,
            "yhat_upper": 204.42567220997176
        },
        {
            "ds": "2025-02-12",
            "yhat": 175.5385264203041,
            "yhat_lower": 148.41034072222047,
            "yhat_upper": 203.9634594825441
        },
        {
            "ds": "2025-02-13",
            "yhat": 179.91860925079007,
            "yhat_lower": 151.05311452584223,
            "yhat_upper": 209.5564054719058
        },
        {
            "ds": "2025-02-14",
            "yhat": 175.36146197713248,
            "yhat_lower": 146.81530479694987,
            "yhat_upper": 203.39928472139852
        },
        {
            "ds": "2025-02-15",
            "yhat": 177.60054773616605,
            "yhat_lower": 147.4505005849157,
            "yhat_upper": 208.184532948314
        },
        {
            "ds": "2025-02-16",
            "yhat": 176.24510904380665,
            "yhat_lower": 146.53816364445208,
            "yhat_upper": 205.8847610717203
        },
        {
            "ds": "2025-02-17",
            "yhat": 174.951827217922,
            "yhat_lower": 145.95494449372688,
            "yhat_upper": 204.6203872679479
        },
        {
            "ds": "2025-02-18",
            "yhat": 176.18557844211423,
            "yhat_lower": 145.9526540489289,
            "yhat_upper": 205.446038136331
        },
        {
            "ds": "2025-02-19",
            "yhat": 176.0036055328132,
            "yhat_lower": 145.4823383590454,
            "yhat_upper": 204.74626890324583
        },
        {
            "ds": "2025-02-20",
            "yhat": 180.3836883632929,
            "yhat_lower": 150.3359433500748,
            "yhat_upper": 207.5204916083274
        },
        {
            "ds": "2025-02-21",
            "yhat": 175.82654108964653,
            "yhat_lower": 147.08420029240492,
            "yhat_upper": 204.9987878062629
        },
  ],
  optimal_stock: 154,
  reorder_point: 1153.55,
};

const ForecastChart = ({ forecastData }: ForecastChartProps) => {
  const dataToUse = forecastData ?? demoData;

  const mergedData = [
    ...dataToUse.actual.map((a) => ({
      date: a.ds,
      actual: a.y,
      forecast: null,
      lower: null,
      upper: null,
      optimal: dataToUse.optimal_stock,
      reorder: dataToUse.reorder_point,
    })),
    ...dataToUse.forecast.map((f) => ({
      date: f.ds,
      actual: null,
      forecast: f.yhat,
      lower: f.yhat_lower,
      upper: f.yhat_upper,
      optimal: dataToUse.optimal_stock,
      reorder: dataToUse.reorder_point,
    })),
  ];

  return (
    <ResponsiveContainer width="100%" height={450}>
      <LineChart
        data={mergedData}
        margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" opacity={0.4} />
        <XAxis
          dataKey="date"
          tickFormatter={(v) => v.slice(5)}
          stroke="#888"
          style={{ fontSize: "11px" }}
        />
        <YAxis
          label={{
            value: "Demand / Inventory",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle", fill: "#888" },
          }}
          stroke="#888"
          style={{ fontSize: "11px" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        />
        <Legend />

        {/* 🔮 Confidence Band (shaded area) */}
        <Area
          type="monotone"
          dataKey="upper"
          stroke="none"
          fill="rgba(168,85,247,0.15)" // light purple transparent
          baseLine={mergedData.map((d) => d.lower)}
          activeDot={false}
        />

        {/* 🟦 Actual Demand */}
        <Line
          type="monotone"
          dataKey="actual"
          stroke="#007bff"
          strokeWidth={2.5}
          dot={false}
          name="Actual Demand"
        />

        {/* 🟪 Forecast Mean */}
        <Line
          type="monotone"
          dataKey="forecast"
          stroke="#a855f7"
          strokeDasharray="6 4"
          strokeWidth={2.5}
          dot={false}
          name="Forecast (Mean)"
        />

        {/* 🟩 Optimal Stock */}
        <ReferenceLine
          y={dataToUse.optimal_stock}
          stroke="#22c55e"
          strokeWidth={2}
          label={{
            value: "Optimal Stock",
            position: "right",
            fill: "#22c55e",
            fontSize: 11,
          }}
        />

        {/* 🟧 Reorder Point */}
        <ReferenceLine
          y={dataToUse.reorder_point}
          stroke="#f97316"
          strokeDasharray="4 4"
          strokeWidth={1.5}
          label={{
            value: "Reorder Point",
            position: "right",
            fill: "#f97316",
            fontSize: 11,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ForecastChart;
