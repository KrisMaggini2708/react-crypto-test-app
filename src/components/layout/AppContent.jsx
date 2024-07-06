import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetsTable";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  padding: "1rem",
  color: "#fff",
  background: "linear-gradient(90deg, #f598a8, #f6edb2)",
};

export default function AppContent() {
  const { assets, crypto } = useCrypto();
  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "white" }}>
        Partfolio:{" "}
        {assets
          .map((asset) => {
            return asset.amount * cryptoPriceMap[asset.id];
          })
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(2)}
        $
      </Typography.Title>

      <PortfolioChart />
      <AssetsTable  />
    </Layout.Content>
  );
}
