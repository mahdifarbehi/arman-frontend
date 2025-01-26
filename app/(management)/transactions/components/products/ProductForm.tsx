import { SubmitButton } from "@/components/form/Buttons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleTransactionProductAction } from "@/utils/actions";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useActionState, useEffect, useState } from "react";
import { fetchProductSupplierList } from "@/store/storeSlice";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
const initialState = {
  message: "",
  success: false,
};
type ProductFormProps = {
  product?: any;
  edit?: boolean;
  setOpen?: (state: boolean) => void;
  revalidation: () => void;
  transactionId: number;
};

const ProductForm = ({
  setOpen,
  revalidation,
  transactionId,
}: ProductFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { productSupplierList } = useSelector(
    (state: RootState) => state.store
  );
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    if (productSupplierList.length == 0) dispatch(fetchProductSupplierList());
  }, [dispatch, productSupplierList]);
  useEffect(() => {
    if (productSupplierList.length !== 0) {
      const newProductList = productSupplierList.map((ps) => ({
        id: ps.id,
        title: (
          <div className="flex justify-between items-center gap-2 text-xs">
            <span className="text-right text-green-500 font-bold">
              {ps.product.title}
            </span>
            <span className="text-left text-gray-500">
              قیمت اصلی:{ps.selling_price || "0"} تومان
            </span>
            {ps.discount_price!==null && (
              <span className="text-left text-blue-500">
                با تخفیف:{ps.discount_price} تومان
              </span>
            )}

            <span className="text-right">
              {ps.inventory} {ps.unit}
            </span>
          </div>
        ),
      }));
      setProductsList(newProductList);
    }
  }, [setProductsList, productSupplierList]);

  const [state, formAction] = useActionState(
    handleTransactionProductAction,
    initialState
  );
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({ description: state.message });
    }
    if (state?.success) {
      revalidation();
      setOpen(false);
    }
  }, [state, setOpen, toast, revalidation]);

  const [formData, setFormData] = useState({
    transaction_id: transactionId,
    product_supplier_id: 0,
    quantity: 0,
    discount: false,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form action={formAction} className="w-full">
      <Input type="hidden" value={transactionId} name="transaction_id" />

      <div className="mb-2">
        <Label> محصول </Label>
        <Select
          dir="rtl"
          name="product_supplier_id"
          value={formData.product_supplier_id.toString()}
          onValueChange={(value) => handleChange("product_supplier_id", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="محصول   موردنظر را انتخاب کنید">
              {productsList.find((pl) => pl.id == formData.product_supplier_id)
                ?.title || "محصول موردنظر را انتخاب کنید"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {productsList.map((product) => (
                <SelectItem key={product.id} value={product.id.toString()}>
                  {product.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="grid md:grid-cols-2 gap-4 mt-4 w-[40rem]]">
          <div className="mb-2">
            <Label>تعداد </Label>
            <Input
              type="number"
              name="quantity"
              defaultChecked={Boolean(formData?.quantity) || false}
              defaultValue={formData?.quantity || ""}
              onChange={(e) => handleChange("quantity", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <Label>تخفیف </Label>
            <Checkbox
              name="discount"
              value={formData.discount.toString() || ""}
              onChange={(e) => handleChange("discount", Boolean(e))}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-2 mt-8">
        <SubmitButton text="ذخیره" className=" w-full" />
      </div>
    </form>
  );
};

export default ProductForm;
