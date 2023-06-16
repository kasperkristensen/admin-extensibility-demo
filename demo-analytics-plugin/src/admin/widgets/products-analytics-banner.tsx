import type { WidgetConfig } from "@medusajs/admin";
import { Link } from "react-router-dom";
import Button from "../shared/button";
import GetStartedIcon from "../shared/icons/get-started-icon";

const ProductAnalyticsBanner = () => {
  return (
    <div className="flex flex-col bg-white rounded-lg border border-gray-200 mb-2">
      <div className="py-6 px-8 flex items-center justify-between">
        <div className="flex gap-x-5">
          <GetStartedIcon />
          <div>
            <h1 className="font-semibold text-lg">Analytics Report</h1>
            <p>Sales are up by 16% compared to yesterday</p>
          </div>
        </div>
        <Link to="analytics">
          <Button variant="secondary" size="small">
            See breakdown
          </Button>
        </Link>
      </div>
    </div>
  );
};

export const config: WidgetConfig = {
  zone: "product.details.before",
};

export default ProductAnalyticsBanner;
