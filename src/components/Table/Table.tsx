import React from "react";
import { Avatar, Space, Table as AntTable } from "antd";

import { TableProps } from "./Table.interface";
import { Gist } from "../../hooks/useGists/useGists.interface";

export const Table: React.FC<TableProps> = ({
  gists,
  isLoading,
  gristClicked = () => {},
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: ({ name, img }: { name: string; img: string }) => (
        <Space>
          <Avatar src={img} />
          <span>{name}</span>
        </Space>
      ),
      width: "20%",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "20%",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: "20%",
    },
    {
      title: "Public",
      key: "public",

      dataIndex: "public",
      width: "20%",
    },
    {
      title: "Notebook",
      key: "Notebook",
      dataIndex: "Notebook",
      width: "20%",
    },
  ];

  const gistsDataSource = React.useMemo(() => {
    if (!gists.length) return [];
    return gists.map((item: Gist) => ({
      key: item.id,
      name: { name: item.owner.login, img: item.owner.avatar_url },
      date: new Date(item.created_at).toLocaleDateString(),
      time: new Date(item.created_at).toLocaleTimeString(),
      public: item.public ? "Yes" : "No",
      Notebook: Object.keys(item.files)[0],
    }));
  }, [gists]);
  const onRowClicked = (item: unknown) => {
    if (typeof (item as { key: unknown }).key === "string") {
      gristClicked((item as { key: string }).key);
    }
  };

  return (
    <AntTable
      onRow={(record) => {
        return {
          onClick: (event) => {
            onRowClicked(record);
          },
        };
      }}
      pagination={false}
      columns={columns}
      loading={isLoading}
      dataSource={gistsDataSource}
    />
  );
};
