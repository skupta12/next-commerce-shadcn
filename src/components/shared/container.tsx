interface WidthWrapperProps {
  className?: string;
  children: React.ReactNode;
  size?: number;

}

export const Container: React.FC<WidthWrapperProps> = ({
  children,
  className,
  size
}) => {
  return (
    <div
      className={`${className} mx-auto w-full max-w-[1660px] px-4 sm:px-10 relative`}
      style={{ maxWidth: size}}
    >
      {children}
    </div>
  );
};
