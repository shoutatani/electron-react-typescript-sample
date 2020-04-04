import axios from "axios";
import { Button, Column, Columns, Footer, Title } from "bloomer";
import { Box } from "bloomer/lib/elements/Box";
import { format } from "date-fns";
import ja from "date-fns/locale/ja";
import * as Electron from "electron";
import * as React from "react";
import { useState } from "react";
import { ItemType } from "../interfaces/common";
import "./QiitaItems.scss";

export const QiitaItems = () => {
  const [itemsList, setItemsList] = useState([]);
  const onClick = async () => {
    if (!confirm("Qiitaから記事データを取得しますか？")) {
      return;
    }
    try {
      const res = await axios.get("https://qiita.com/api/v2/items");
      const items = res.data;
      const itemList = [];
      for (const item of items) {
        const i: ItemType = {
          user_id: item.user.id,
          title: item.title,
          url: item.url,
          created_at: new Date(item.created_at),
        };
        itemList.push(i);
      }
      console.log(itemList);
      setItemsList(itemList);
    } catch (error) {
      const { status, statusText } = error.response;
      console.log(`Error! HTTP Status: ${status} ${statusText}`);
    }
  };

  const versions: NodeJS.ProcessVersions = Electron.remote.process.versions;

  return (
    <div className="parent">
      <Title isSize={1}>Electron template app for me</Title>
      <Button isColor="info" onClick={onClick}>
        Qiitaから最新の記事データ20個を取得
      </Button>
      <div className="items-list">
        {itemsList
          ? itemsList.map((item: ItemType) => (
              <Box>
                <a href={item.url} target="_blank">
                  {item.title}
                </a>
                <ul>
                  <li>author: {item.user_id}</li>
                  <li>
                    created at:{" "}
                    {format(item.created_at, "yyyy/MM/dd HH:mm", {
                      locale: ja,
                    })}
                  </li>
                </ul>
              </Box>
            ))
          : ""}
      </div>
      <Footer className="footer">
        <Columns>
          <Column>
            <p>
              using node {versions.node}, using Chrome {versions.chrome}, and
              using Electron {versions.electron}.
            </p>
          </Column>
        </Columns>
      </Footer>
    </div>
  );
};
