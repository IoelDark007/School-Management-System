export interface FeeTransaction {
  student: string;
  id: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue" | "Partial";
  date: string;
}

export const mockFeeTransactions: FeeTransaction[] = [
  {
    student: "Aisha Mohamed",
    id: "INV-2026001",
    amount: 4500,
    status: "Paid",
    date: "2026-01-20",
  },
  {
    student: "James Kiptoo",
    id: "INV-2026002",
    amount: 6200,
    status: "Paid",
    date: "2026-01-18",
  },
  {
    student: "Fatima Ali",
    id: "INV-2026003",
    amount: 3800,
    status: "Pending",
    date: "2026-01-15",
  },
  {
    student: "Liam Omondi",
    id: "INV-2026004",
    amount: 5200,
    status: "Overdue",
    date: "2025-12-10",
  },
  {
    student: "Sophia Wangari",
    id: "INV-2026005",
    amount: 4500,
    status: "Partial",
    date: "2026-01-22",
  },
  {
    student: "Noah Kipchoge",
    id: "INV-2026006",
    amount: 7000,
    status: "Paid",
    date: "2026-01-05",
  },
  {
    student: "Amina Hassan",
    id: "INV-2026007",
    amount: 4100,
    status: "Pending",
    date: "2026-01-23",
  },
];