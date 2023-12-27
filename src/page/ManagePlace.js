import TransactionPointTable from "../component/page/point/TransactionPointTable";
import GatheringPointTable from "../component/page/point/GatheringPointTable";
import Typography from "@mui/material/Typography";

export default function ManagePlace() {
    return (
        <>
            <Typography variant="h5">Transaction Point</Typography>
            <TransactionPointTable/>
            <Typography variant="h5">Gathering Point</Typography>
            <GatheringPointTable/>
        </>
    );
}
