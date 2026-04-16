import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { format } from "date-fns";

export type LogLevel = "info" | "warning" | "critical" | "success";

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: LogLevel;
  source: string;
  message: string;
}

interface LogEntryTableProps {
  logs: LogEntry[];
}

export function LogEntryTable({ logs }: LogEntryTableProps) {
  const getLevelColor = (level: LogLevel) => {
    switch (level) {
      case "critical": return "bg-rose-100 text-rose-700 border-rose-200";
      case "warning": return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-white">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-[100px] text-[10px] font-bold uppercase tracking-wider">Time</TableHead>
            <TableHead className="w-[100px] text-[10px] font-bold uppercase tracking-wider">Level</TableHead>
            <TableHead className="w-[150px] text-[10px] font-bold uppercase tracking-wider">Source</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-wider">Message</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <ScrollArea className="h-[calc(100vh-280px)]">
        <Table>
          <TableBody>
            {logs.length > 0 ? (
              logs.map((log) => (
                <TableRow key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-mono text-[10px] text-slate-500 whitespace-nowrap">
                    {format(log.timestamp, "HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[9px] px-1.5 py-0 rounded-md font-bold uppercase ${getLevelColor(log.level)}`}>
                      {log.level}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[10px] font-semibold text-slate-600">
                    {log.source}
                  </TableCell>
                  <TableCell className="text-[10px] text-slate-700 leading-relaxed max-w-md truncate lg:max-w-none lg:whitespace-normal">
                    {log.message}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-slate-400 text-[10px] font-medium uppercase tracking-widest">
                  No system logs found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
