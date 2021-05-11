import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Container,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const PendingTransactions = ({ pendingTransactions, ...props }) => {
  return (
    <Card {...props}>
      <CardHeader title="History Transactions" />
      <Divider />
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Txn ID</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              {/* <TableCell sortDirection="desc">
      <Tooltip enterDelay={300} title="Sort">
        <TableSortLabel active direction="desc">
          Date
        </TableSortLabel>
      </Tooltip>
    </TableCell> */}
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingTransactions.map((transaction) => (
              <TableRow hover key={transaction.transactionId}>
                <TableCell>{transaction.transactionId}</TableCell>
                <TableCell>
                  {/* {moment(transaction.createdAt).format('DD/MM/YYYY')} */}
                  {transaction.date}
                </TableCell>
                <TableCell>
                  {/* <Chip
          color="primary"
          label={transaction.status}
          size="small"
        /> */}
                  <div
                    style={{
                      width: 300,
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {transaction.sender}
                  </div>
                </TableCell>
                <TableCell>{transaction.recipient}</TableCell>
                <TableCell>{transaction.amount} RIN</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

export default PendingTransactions;
