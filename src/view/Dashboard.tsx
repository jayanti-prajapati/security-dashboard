import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useStoreActions, useStoreState } from "../store/hooks";
import { Item } from "../store";
import { Loader } from "../components/Loader";
import { ProductData } from "../store/model";

export const Dashboard = () => {
  const { items, isLoading } = useStoreState((state) => state);
  const fetch = useStoreActions((actions) => actions.fetch);

  useEffect(() => {
    fetch();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item: ProductData) => {
              return (
                <Tr key={item.uuid}>
                  <Td>{item.component.name}</Td>
                  <Td>{item.type}</Td>
                  <Td>{item.malicious}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
