import { Center, Pagination } from "@mantine/core";
import { useNavigate } from "react-router";

interface CustomPaginationPropType {
  currentPage: number;
  total: number;
}

const CustomPagination = (props: CustomPaginationPropType) => {
  const { currentPage, total } = props

  const nav = useNavigate();


  const handlePageChange = (newPage: number) => {
    nav(`/news?page=${newPage}&page_size=10`);
    console.log('clicked')
  };

  return (
    <Center>
      <Pagination
        value={currentPage}
        mb={20}
        onChange={handlePageChange}
        total={total}
      />
    </Center>
  );
}

export default CustomPagination;