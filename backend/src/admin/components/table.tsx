type TableProps = React.ComponentPropsWithoutRef<"table">;

const Table = ({ children, ...rest }: TableProps) => {
  return (
    <table className="table-auto w-full" {...rest}>
      {children}
    </table>
  );
};

type TableHeadProps = React.ComponentPropsWithoutRef<"thead">;

const TableHead = ({ children, ...rest }: TableHeadProps) => {
  return (
    <thead>
      <tr className="border-b border-gray-200">{children}</tr>
    </thead>
  );
};

type TableBodyProps = React.ComponentPropsWithoutRef<"tbody">;

const TableBody = ({ children, ...rest }: TableBodyProps) => {
  return <tbody>{children}</tbody>;
};

type TableRowProps = React.ComponentPropsWithoutRef<"tr">;

const TableRow = ({ children, ...rest }: TableRowProps) => {
  return <tr className="border-b border-gray-200">{children}</tr>;
};

type TableHeaderProps = React.ComponentPropsWithoutRef<"th">;

const TableHeader = ({ children, ...rest }: TableHeaderProps) => {
  return <th className="py-2 px-4 text-left">{children}</th>;
};

type TableDataProps = React.ComponentPropsWithoutRef<"td">;

const TableData = ({ children, ...rest }: TableDataProps) => {
  return <td className="py-2 px-4">{children}</td>;
};

const injectionZones = [
  // Order injection zones
  "order.details.before",
  "order.details.after",
  "order.list.before",
  "order.list.after",
  // Draft order injection zones
  "draft_order.list.before",
  "draft_order.list.after",
  "draft_order.details.before",
  "draft_order.details.after",
  // Customer injection zones
  "customer.details.before",
  "customer.details.after",
  "customer.list.before",
  "customer.list.after",
  // Customer group injection zones
  "customer_group.details.before",
  "customer_group.details.after",
  "customer_group.list.before",
  "customer_group.list.after",
  // Product injection zones
  "product.details.before",
  "product.details.after",
  "product.list.before",
  "product.list.after",
  // Product collection injection zones
  "product_collection.details.before",
  "product_collection.details.after",
  "product_collection.list.before",
  "product_collection.list.after",
  // Price list injection zones
  "price_list.details.before",
  "price_list.details.after",
  "price_list.list.before",
  "price_list.list.after",
  // Discount injection zones
  "discount.details.before",
  "discount.details.after",
  "discount.list.before",
  "discount.list.after",
  // Gift card injection zones
  "gift_card.details.before",
  "gift_card.details.after",
  "gift_card.list.before",
  "gift_card.list.after",
  "custom_gift_card.before",
  "custom_gift_card.after",
  // Login
  "login.before",
  "login.after",
];

function camelCaseString(str: string): string {
  const words = str.split("_");

  const capitalizedWords = words.map((word, index) => {
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });

  return capitalizedWords.join("");
}

const InjectionZoneTable = () => {
  const alreadyRendered: string[] = [];

  return (
    <Table>
      <TableHead>
        <TableHeader>Zone</TableHeader>
        <TableHeader>Type</TableHeader>
      </TableHead>
      <TableBody>
        {injectionZones.map((zone) => {
          const segments = zone.split(".");

          const zoneVal =
            segments.length === 3
              ? `${segments[0]}.${segments[1]}.*`
              : `${segments[0]}.*`;

          if (alreadyRendered.includes(zoneVal)) {
            return null;
          }

          alreadyRendered.push(zoneVal);

          const typeVal =
            zoneVal === "custom_gift_card.*"
              ? "CustomGiftCardWidgetProps"
              : segments.length === 3 && segments[1] === "details"
              ? `${camelCaseString(segments[0])}DetailsWidgetProps`
              : "WidgetProps";

          return (
            <TableRow>
              <TableData>
                <code>{zoneVal}</code>
              </TableData>
              <TableData>
                <code>{typeVal}</code>
              </TableData>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default InjectionZoneTable;
