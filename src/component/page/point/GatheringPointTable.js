import {useState, useEffect} from 'react';
import {listGatheringPoints} from "../../../api/point";
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
        field: 'address',
        headerName: 'Address',
        flex: 2
    },
    {
        field: 'gatheringLeader',
        headerName: 'Leader',
        flex: 2
    },
];



export default function GatheringPointTable() {
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
            // fetch data from server
            const data = await listGatheringPoints();
            const render = data.map(row => {
                return {
                    ...row,
                    address: row.address?.street,
                    gatheringLeader: row.gatheringLeader?.username
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
