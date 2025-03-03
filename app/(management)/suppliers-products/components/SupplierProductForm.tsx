"use client";
import React, { useEffect, useState } from "react";
import { SubmitButton } from "@/components/form/Buttons";
import { SupplierProduct } from "@/utils/types";
import FormContainer from "@/components/form/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fetchProductsList, fetchSuppliersList } from "@/store/storeSlice";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isoToPersian } from "@/utils/dateConvertor";
import { handleSupplierProductAction } from "@/utils/actions";

type SupplierProductFormProps = {
  supplierProduct?: SupplierProduct | null;
  edit?: boolean;
  setOpen: (state: boolean) => void;
  onSupplierProductSubmit: () => void;
};

function SupplierProductForm({
  supplierProduct,
  setOpen,
  edit = false,
  onSupplierProductSubmit,
}: SupplierProductFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { products, suppliers } = useSelector(
    (state: RootState) => state.store
  );

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProductsList());
    if (suppliers.length === 0) dispatch(fetchSuppliersList());
  }, [dispatch, products.length, suppliers.length]);

  const [formData, setFormData] = useState({
    id: supplierProduct?.id || null,
    supplier: supplierProduct?.supplier?.id || 0,
    product: supplierProduct?.product?.id || 0,
    unit: supplierProduct?.unit || "",
    purchase_price: supplierProduct?.purchase_price || 0,
    selling_price: supplierProduct?.selling_price || 0,
    inventory: supplierProduct?.inventory || 0,
    purchase_price_date: supplierProduct?.purchase_price_date || "",
    selling_price_date: supplierProduct?.selling_price_date || "",
    inventory_date: supplierProduct?.inventory_date || "",
    discount_price: supplierProduct?.discount_price || 0,
    commission: supplierProduct?.commission || 0,
    installment: supplierProduct?.installment || false,
    description: supplierProduct?.description || "",
    quality: supplierProduct?.quality || "",
  });

  const handleChange = (field: keyof SupplierProduct, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <FormContainer
      action={handleSupplierProductAction}
      setOpen={setOpen}
      onFormSuccess={onSupplierProductSubmit}
    >
      <div className="grid md:grid-cols-2 gap-4 mt-4 w-[36rem]">
        {!!supplierProduct?.id && (
          <Input type="hidden" value={supplierProduct?.id} name="id" />
        )}
        {/* supplier */}
        <div className="mb-2">
          <Label>تامین کننده</Label>
          <Select
            dir="rtl"
            name="supplier_id"
            value={formData.supplier?.toString()}
            onValueChange={(value) => handleChange("supplier", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="دسته  موردنظر را انتخاب کنید">
                {suppliers.find((c) => c.id == formData.supplier)
                  ?.company_name || "دسته موردنظر را انتخاب کنید"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier.id} value={supplier.id.toString()}>
                    {supplier.company_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* product title */}
        <div className="mb-2">
          <Label>نام محصول</Label>
          <Select
            dir="rtl"
            name="product_id"
            value={formData.product?.toString()}
            onValueChange={(value) => handleChange("product", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="دسته  موردنظر را انتخاب کنید">
                {products.find((c) => c.id == formData.product)?.title ||
                  "دسته موردنظر را انتخاب کنید"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* purchase-price */}
        <div className="mb-2">
          <Label>قیمت خرید </Label>
          <Input
            type="text"
            name="purchase_price"
            value={formData.purchase_price.toString()}
            onChange={(e) => handleChange("purchase_price", +e.target.value)}
          />
        </div>
        {/* purchase-price-date */}
        <div className="mb-2">
          <Label> تاریخ تغییر </Label>
          {edit ? (
            <>
              <Input
                type="text"
                name="purchase_price_date"
                readOnly
                value={
                  !!formData?.purchase_price_date
                    ? isoToPersian(formData?.purchase_price_date)
                    : ""
                }
              />
            </>
          ) : (
            <>
              {/* <PersianDateTimePicker
                name="purchase_price_date"
                text="تاریخ خرید"
                onDateChange={(e) => handleChange("purchase_price_date", e)}
              /> */}
              <Input type="text" readOnly name="purchase_price_date" />
            </>
          )}
        </div>
        {/* selling-price */}
        <div className="mb-2">
          <Label>قیمت فروش </Label>
          <Input
            type="text"
            name="selling_price"
            value={formData.selling_price.toString()}
            onChange={(e) => handleChange("selling_price", +e.target.value)}
          />
        </div>
        {/* selling-price-date */}
        <div className="mb-2">
          <Label> تاریخ تغییر </Label>
          {edit ? (
            <>
              <Input
                type="text"
                name="selling_price_date"
                readOnly
                value={
                  !!formData.selling_price_date
                    ? isoToPersian(formData.selling_price_date)
                    : ""
                }
              />
            </>
          ) : (
            <>
              {/* <PersianDateTimePicker
                name="selling_price_date"
                text="تاریخ فروش"
                onDateChange={(e) => handleChange("selling_price_date", e)}
              /> */}
              <Input type="text" readOnly name="selling_price_date" />
            </>
          )}
        </div>
        {/* inventory */}
        <div className="mb-2">
          <Label>موجودی</Label>
          <Input
            type="text"
            name="inventory"
            value={formData.inventory.toString()}
            onChange={(e) => handleChange("inventory", +e.target.value)}
          />
        </div>
        {/* inventory-date */}
        <div className="mb-2">
          <Label> تاریخ تغییر </Label>
          {edit ? (
            <>
              <Input
                type="text"
                name="inventory_date"
                readOnly
                value={
                  !!formData.inventory_date
                    ? isoToPersian(formData.inventory_date)
                    : ""
                }
              />
            </>
          ) : (
            <>
              {/* <PersianDateTimePicker
                text="تاریخ موجودی"
                name="inventory_date"
                onDateChange={(e) => handleChange("inventory_date", e)}
              />{" "} */}
              <Input type="text" readOnly name="inventory_date" />
            </>
          )}
        </div>
        {/* discount-price */}
        <div className="mb-2">
          <Label>قیمت فروش با تخفیف </Label>
          <Input
            type="text"
            name="discount"
            value={formData.discount_price.toString()}
            onChange={(e) => handleChange("discount_price", +e.target.value)}
          />
        </div>
        {/*Quality */}
        <div className="mb-2">
          <Label>کیفیت </Label>
          <Input
            type="text"
            name="quality"
            value={formData.quality}
            onChange={(e) => handleChange("quality", e.target.value)}
          />
        </div>
        {/* commission */}
        <div className="mb-2">
          <Label>درصد پورسانت فروشنده</Label>
          <Input
            type="text"
            name="commission"
            value={formData.commission.toString()}
            onChange={(e) => handleChange("commission", +e.target.value)}
          />
        </div>
        {/* unit */}
        <div className="mb-2">
          <Label>واحد </Label>
          <Input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={(e) => handleChange("unit", e.target.value)}
          />
        </div>
        <div className="mb-2">
          <Label>امکان فروش قسطی </Label>
          <Checkbox
            name="installment"
            defaultChecked={formData?.installment || false}
            onChange={(e) => handleChange("installment", Boolean(e))}
          />
        </div>
      </div>

      <div className="mb-2">
        <Label>توضیحات</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
        />
      </div>

      <SubmitButton text="ذخیره" className="mt-8 w-full" />
    </FormContainer>
  );
}

export default React.memo(SupplierProductForm);
