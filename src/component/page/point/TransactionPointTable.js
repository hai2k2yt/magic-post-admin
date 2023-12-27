import {useState, useEffect} from 'react';
import {listTransactionPoints} from "../../../api/point";
import {DataGrid} from "@mui/x-data-grid";



const columns = [
    {
        field: 'id',
        headerName: 'ID',
        flex: 1
    },
    {
        field: 'name',
        headerName: 'Name',
        flex: 2
    },
    {
        field: 'zipcode',
        headerName: 'Zip code',
        flex: 1
    },
    {
        field: 'address',
        headerName: 'Address',
        flex: 2
    },
    {
        field: 'transactionLeader',
        headerName: 'Leader',
        flex: 2
    },
];



export default function TransactionPointTable() {
  const [rows, setRows] = useState([]);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [filterModel, setFilterModel] = useState({
    items: []
  });
  const [sortModel, setSortModel] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      const data = await listTransactionPoints();
      console.log(data);
      const render = data.map(row => {
        return {
            ...row,
            zipcode: row.address.zipcode,
            address: row.address?.street,
            transactionLeader: row.transactionLeader?.username
        }
      })

      setRows(render);
    }
    fetcher();
  }, []);

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      pagination
      sortingMode="server"
      filterMode="server"
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      onSortModelChange={setSortModel}
      onFilterModelChange={setFilterModel}
    />
  );
}
