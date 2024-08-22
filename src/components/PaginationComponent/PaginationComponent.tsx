import { Pagination } from "@mui/material";

interface PaginationComponentProps {
  count: number;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  count,
  page,
  onPageChange,
}) => (
  <Pagination
    count={count}
    page={page}
    onChange={onPageChange}
    color="primary"
  />
);

export default PaginationComponent;
