import { Table } from '@mantine/core';
interface RowDataType {
  name: string;
  dob: string;
  gender: string;
  address: string;
  first_release_year: number;
  no_of_albums_released: number;
  id: number;
  created_at: string;
  updated_at: string
}

interface ArtistTablePropsType {
  rowData: RowDataType[];
}


const ArtistTable = (props: ArtistTablePropsType) => {
  const { rowData } = props;
  const rows = rowData.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.gender}</Table.Td>
      <Table.Td>{element.address}</Table.Td>
      <Table.Td>{element.dob.slice(0, 10)}</Table.Td>
      <Table.Td>{element.first_release_year}</Table.Td>
      <Table.Td>{element.no_of_albums_released}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Gender</Table.Th>
          <Table.Th>Address</Table.Th>
          <Table.Th>Dob</Table.Th>
          <Table.Th>First Release Year</Table.Th>
          <Table.Th>No of Albums Released</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default ArtistTable
