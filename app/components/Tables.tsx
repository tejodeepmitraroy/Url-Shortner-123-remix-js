import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { Clipboard } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

export interface TablesProps {
  id: string;
  shortId: string;
  redirectUrl: string;
  visitHistory: [
    {
      id: string;
      createdAt: string;
    }
  ];
  createdAt: string;
  updatedAt: string;
}

const Tables = ({ analytics }: { analytics: TablesProps[] }) => {
  const [page, setPage] = useState(1);

  const rowsPerPage = 4;

  const pages = Math.ceil(analytics.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return analytics.slice(start, end);
  }, [page, analytics]);

  const renderCell = useCallback((data: TablesProps, columnKey: unknown) => {
    const cellValue = data[columnKey];

    switch (columnKey) {
      case "shortLink":
        return (
          <div className="flex items-center gap-2 justify-between">
            {`${window.location.href}${data.shortId}`}

            <CopyToClipboard text={`${window.location.href}${data.shortId}`}>
              <button
                title="copy link"
                className={`border p-2 rounded-3xl  text-center bg-[#f7c00ae8] cursor-pointer `}
              >
                <Clipboard size={16} />
              </button>
            </CopyToClipboard>
          </div>
        );
      case "visitNumber":
        return <div>{data.visitHistory.length}</div>;
      case "url":
        return <div>{data.redirectUrl}</div>;
      case "date":
        return (
          <div>
            {new Date(data.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      fullWidth
      isStriped
      className="w-full overflow-hidden"
      aria-label="Example static collection "
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader>
        <TableColumn key={"shortLink"}>Short link</TableColumn>
        <TableColumn key={"visitNumber"}>Visited Number</TableColumn>
        <TableColumn key={"url"}>Url</TableColumn>
        {/* <TableColumn>Date</TableColumn> */}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Tables;
