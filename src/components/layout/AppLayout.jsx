import { Layout, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";
import AppContent from "./AppContent";
import { useContext } from "react";
import CryptoContext from "../../context/crypto-context";

export default function AppLayout() {
  const { loading } = useContext(CryptoContext);

  if (loading) {
    return (
      <Spin
        indicator={
          <LoadingOutlined style={{ fontSize: 48, color: "white" }} spin />
        }
        fullscreen
      />
    );
  }

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}
