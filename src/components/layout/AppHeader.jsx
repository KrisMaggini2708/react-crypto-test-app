import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useState, useEffect } from "react";
import CoinInfoModel from "../CoinInfoModel";
import AddAssetsForm from "../AddAssetsForm";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  lineHeight: "64px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#4096ff",
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [drawer, setDraver] = useState(false);
  const [coin, setCoin] = useState(null);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keyprerss = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keyprerss);
    return () => document.removeEventListener("keypress", keyprerss);
  }, []);

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250,
        }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="press / to open"
        optionLabelProp="label"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(options) => (
          <Space>
            <img
              style={{ width: 30 }}
              src={options.data.icon}
              alt={options.data.label}
            />{" "}
            {options.data.label}
          </Space>
        )}
      />
      <Button
        type="primary"
        onClick={() => setDraver(true)}
        style={{ backgroundColor: "#fff", color: "black" }}
      >
        Add assets
      </Button>
      <Modal
        open={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <CoinInfoModel coin={coin} />
      </Modal>

      <Drawer
      destroyOnClose
        width={600}
        title="Add  Asset"
        onClose={() => setDraver(false)}
        open={drawer}
        
      >

        <AddAssetsForm onClose={() => setDraver(false)}/>
      </Drawer>
    </Layout.Header>
  );
}
