import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Transaction = {
  id: string;
  studentName: string;
  initials: string;
  studentId: string;
  amount: string;
  status: "PAID" | "PENDING" | "OVERDUE";
  date: string;
};

const transactions: Transaction[] = [
  {
    id: "1",
    studentName: "Julianne Devis",
    initials: "JD",
    studentId: "#SMS-2024-0492",
    amount: "$1,200.00",
    status: "PAID",
    date: "Oct 12, 2024",
  },
  {
    id: "2",
    studentName: "Marcus Wright",
    initials: "MW",
    studentId: "#SMS-2024-1182",
    amount: "$850.00",
    status: "PENDING",
    date: "Oct 11, 2024",
  },
  {
    id: "3",
    studentName: "Emily Lawson",
    initials: "EL",
    studentId: "#SMS-2024-0021",
    amount: "$1,200.00",
    status: "PAID",
    date: "Oct 10, 2024",
  },
  // You can easily add more mock data here later
];

export default function FeeTransactionsTable() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Fee Transactions</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Latest payments and pending fees
            </CardDescription>
          </div>
          <Button variant="link" className="text-primary px-0">
            View All
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b">
                <th className="pb-4 text-left text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                  Student Name
                </th>
                <th className="pb-4 text-left text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                  ID Number
                </th>
                <th className="pb-4 text-left text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                  Amount
                </th>
                <th className="pb-4 text-left text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="pb-4 text-left text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="group transition-colors hover:bg-muted/50"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback
                          className={cn(
                            "text-xs font-bold",
                            "bg-primary/10 text-primary"
                          )}
                        >
                          {tx.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-semibold text-foreground">
                        {tx.studentName}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 text-sm text-muted-foreground font-medium">
                    {tx.studentId}
                  </td>

                  <td className="py-4 text-sm font-bold">
                    {tx.amount}
                  </td>

                  <td className="py-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] font-bold px-2.5 py-1 rounded-full",
                        tx.status === "PAID" &&
                          "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800/40",
                        tx.status === "PENDING" &&
                          "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-800/40",
                        tx.status === "OVERDUE" &&
                          "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800/40"
                      )}
                    >
                      {tx.status}
                    </Badge>
                  </td>

                  <td className="py-4 text-sm text-muted-foreground font-medium">
                    {tx.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Optional: show message when no data */}
        {transactions.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No recent transactions found
          </div>
        )}
      </CardContent>
    </Card>
  );
}