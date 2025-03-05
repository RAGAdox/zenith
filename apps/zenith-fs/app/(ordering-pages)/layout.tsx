import CartPreview from "@/components/CartPreview";

const OrderingPagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="pb-16 flex justify-center w-full">{children}</div>
      <CartPreview />
    </>
  );
};

export default OrderingPagesLayout;
