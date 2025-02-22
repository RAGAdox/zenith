import { type ComponentType, type ReactNode } from "react";

interface AutoScrollXProps<T> {
  maxWidth: string;
  component: ComponentType<T>;
  componentProps?: T;
  componentClassName?: string;
  children: ReactNode;
}

const AutoScrollX = <T,>({
  maxWidth,
  component: Component,
  componentProps = {} as T,
  componentClassName = "",
  children,
}: AutoScrollXProps<T>) => {
  return (
    <div
      style={{
        maxWidth,
        overflowX: "scroll",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <Component
        {...componentProps}
        className={`autoscroll-x-child ${componentClassName}`}
        style={{ transform: "none" }}
      >
        {children}
      </Component>
    </div>
  );
};

export default AutoScrollX;
