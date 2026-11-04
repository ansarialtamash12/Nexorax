"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/common/DataTable";
import { useOrderHistory } from "@/features/order-history/hooks/useOrderHistory";
import { formatCurrency } from "@/lib/utils";
import type { OrderHistoryItem } from "@/services/order-history.service";
import type { TableColumn } from "@/components/ui/Table";

const columns: TableColumn<OrderHistoryItem>[] = [
  { key: "sno", header: "S.No", render: (_, index) => index + 1 },
  { key: "Authlogin", header: "Login ID", render: (item) => item.Authlogin },
  { key: "ProductName", header: "Package Type", render: (item) => item.ProductName },
  { key: "Rkprice", header: "Amount", render: (item) => formatCurrency(item.Rkprice) },
  { key: "Paymentmode", header: "Payment Mode", render: (item) => item.Paymentmode },
  { key: "RDate", header: "Order Date", render: (item) => item.RDate },

  {
    key: "Active",
    header: "Status",
    render: (item) => (
      <Badge variant={item.Active ? "success" : "destructive"}>
        {item.Active ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  { key: "Remark", header: "Remark", render: (item) => item.Remark },
];

export function OrderHistoryTable() {
  const [packageType, setPackageType] = useState("");
  const { data, isLoading, isError, refetch } = useOrderHistory();
  const orders = data?.data ?? [];
  const packageTypes = [...new Set(orders.map((item) => item.ProductName.trim()).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));
  const filteredOrders = packageType
    ? orders.filter((item) => item.ProductName.trim() === packageType)
    : orders;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <select
          aria-label="Filter by package type"
          value={packageType}
          onChange={(event) => setPackageType(event.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          {packageTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <DataTable<OrderHistoryItem>
        columns={columns}
        data={filteredOrders}
        getRowId={(item) => item.ProductId}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        emptyTitle="No order history found"
      />
    </div>
  );
}
