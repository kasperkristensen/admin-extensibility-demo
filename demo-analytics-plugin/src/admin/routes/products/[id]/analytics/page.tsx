import { Product } from "@medusajs/medusa";
import { useAdminProduct, useAdminProducts } from "medusa-react";
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import Button from "../../../../shared/button";
import ArrowLeftIcon from "../../../../shared/icons/arrow-left-icon";

const data = [
  {
    name: "00:00",
    Today: 0,
    Yesterday: 0,
  },
  {
    name: "03:00",
    Today: 4,
    Yesterday: 0,
  },
  {
    name: "06:00",
    Today: 9,
    Yesterday: 0,
  },
  {
    name: "09:00",
    Today: 28,
    Yesterday: 19,
  },
  {
    name: "12:00",
    Today: 87,
    Yesterday: 56,
  },
  {
    name: "15:00",
    Today: 99,
    Yesterday: 67,
  },
  {
    name: "18:00",
    Today: 111,
    Yesterday: 90,
  },
  {
    name: "21:00",
    Today: 114,
    Yesterday: 94,
  },
  {
    name: "21:44",
    Today: 123,
    Yesterday: 106,
  },
  {
    name: "23:59",
    Yesterday: 106,
  },
];

const regionData = [
  {
    name: "Sales per Region",
    Europe: 72,
    "North America": 51,
  },
];

const Container = ({ children, className }: React.ComponentProps<"div">) => {
  return (
    <div
      className={`bg-white py-6 px-8 border border-gray-200 rounded-lg h-fit w-full ${className}`}
    >
      {children}
    </div>
  );
};

const Card = ({
  label,
  value,
  positive = true,
  children,
}: React.PropsWithChildren<{
  label: string;
  value: number | string;
  positive?: boolean;
}>) => {
  return (
    <div className="flex flex-col gap-y-1 px-8 py-6 hover:bg-gray-100 transition-colors rounded-lg">
      <div className="flex items-baseline">{children}</div>
      <div className="text-xs flex items-center gap-x-2">
        <p className="text-gray-600">{label}</p>
        <div>
          <p className={positive ? "text-green-500" : "text-red-500"}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

const ProductEntry = ({ product }: { product: Product }) => {
  return (
    <div className="flex items-center justify-between w-full py-2 border-t border-gray-200 last-of-type:border-b">
      <div className="flex items-center gap-x-3">
        <img
          src={product.thumbnail}
          className="h-10 w-10 rounded-lg object-cover"
        />
        <p className="inter-base-regular">{product.title}</p>
      </div>
      <Button variant="secondary" size="small">
        View
      </Button>
    </div>
  );
};

const ProductAnalyticsPage = () => {
  const { id } = useParams();

  const { product, isLoading } = useAdminProduct(id);

  const { products } = useAdminProducts();

  const bundledWith = useMemo(() => {
    return products?.filter((p) => {
      return p.id !== product?.id;
    });
  }, [products, product]);

  return (
    <div>
      <div>
        <div className="px-small py-xsmall mb-xsmall">
          <Link to={`/a/products/${product?.id}`}>
            <div className="gap-x-xsmall text-gray-500 inter-grey-40 inter-small-semibold flex items-center">
              <ArrowLeftIcon />
              <span className="ml-1">Back to Product</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full min-h-screen flex flex-col gap-y-2">
        <Container>
          <div className="flex flex-col gap-y-1">
            <h1 className="font-semibold text-2xl">{product?.title}</h1>
            <div className="flex items-center gap-x-2 text-gray-600 text-sm">
              <p>Analytics Report</p>
              <span>-</span>
              <p>15 Jun, 2023</p>
            </div>
          </div>
        </Container>
        <Container className="flex flex-col gap-y-2">
          <div>
            <h1 className="font-semibold text-2xl">Today</h1>
          </div>
          <div className="flex items-start justify-end gap-x-4">
            <div className="flex items-center gap-x-1">
              <div className="h-2.5 w-2.5 rounded-circle bg-[#8B5CF6] flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-circle bg-white"></div>
              </div>
              <p className="text-gray-600 text-xs">15 Jun, 2023</p>
            </div>
            <div className="flex items-center gap-x-1">
              <div className="h-2.5 w-2.5 rounded-circle bg-[#60A5FA] flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-circle bg-white"></div>
              </div>
              <p className="text-gray-600 text-xs">14 Jun, 2023</p>
            </div>
          </div>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={500} height={180} data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.5}
                  horizontal={false}
                />
                <XAxis dataKey="name" />
                <Tooltip wrapperClassName="rounded-lg border-gray-200 bg-white" />
                <Line
                  type="monotone"
                  width={2}
                  dataKey="Today"
                  stroke="#8B5CF6"
                />
                <Line
                  type="monotone"
                  width={2}
                  dataKey="Yesterday"
                  stroke="#60A5FA"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-4">
            <Card label="Today's sales" value="16%">
              <p className="text-2xl mr-1">123</p>
            </Card>
            <Card label="Today's revenue" value="16%">
              <p className="text-gray-600 text-2xl font-normal mr-2">$</p>
              <p className="text-2xl mr-1">2,706.00</p>
              <p className="text-gray-600 text-sm">USD</p>
            </Card>
            <Card label="Added to cart" value="-2%" positive={false}>
              <p className="text-2xl mr-1">457</p>
            </Card>
            <Card label="Conversion rate" value="26.91%">
              <p className="text-2xl mr-1">23%</p>
            </Card>
          </div>
        </Container>
        <div className="grid grid-cols-2 gap-xsmall">
          <Container>
            <div>
              <div className="mb-2">
                <h1 className="font-semibold text-xl mb-1">Sales by Region</h1>
                <p className="inter-small-regular text-gray-700">
                  This shows the breakdown of sales by region.
                </p>
              </div>
              <div className="w-full h-[343px]">
                <ResponsiveContainer>
                  <BarChart width={500} height={300} data={regionData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      opacity={0.5}
                      horizontal={false}
                    />
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="Europe" fill="#8B5CF6" />
                    <Bar dataKey="North America" fill="#60A5FA" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Container>
          <Container>
            <div>
              <div className="mb-2">
                <h1 className="font-semibold text-xl mb-1">
                  Popularly Bundled Items
                </h1>
                <p className="inter-small-regular text-gray-700">
                  These are the items that are most commonly bundled with this
                  product.
                </p>
              </div>
              <div className="grid grid-cols-1">
                {bundledWith?.map((product) => {
                  return <ProductEntry product={product as Product} />;
                })}
              </div>
            </div>
          </Container>
        </div>
      </div>
      <div className="w-full h-8" />
    </div>
  );
};

export default ProductAnalyticsPage;
