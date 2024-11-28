import { Badge } from "@mantine/core";
import React from "react";

const StatusBadge = ({ status }: { status: string }) => {
  let color: string;

  switch (status) {
    case "PENDING":
      color = "yellow";
      break;
    case "DELIVERED":
      color = "green";
      break;
    case "SHIPPED":
      color = "blue";
      break;
    case "CANCELLED":
      color = "red";
      break;
    default:
      color = "gray";
  }

  return <Badge color={color}>{status}</Badge>;
};

export default StatusBadge;
