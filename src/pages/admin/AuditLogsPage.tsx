import { useState } from "react";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { PageTransition, EmptyState } from "@/components/common";
import { AuditLogTable, mockAuditLogs } from "@/features/admin";
import { Pagination } from "@/features/transactions";

const PER_PAGE = 10;

export default function AuditLogsPage() {
  const [eventTypeFilter, setEventTypeFilter] = useState<string>("all");
  const [entityTypeFilter, setEntityTypeFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  // In production, use: const { data, isLoading } = useAuditLogs(filters);
  const isLoading = false;

  // Filter mock data
  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesEventType =
      eventTypeFilter === "all" || log.event_type.includes(eventTypeFilter);
    const matchesEntityType =
      entityTypeFilter === "all" || log.entity_type === entityTypeFilter;
    return matchesEventType && matchesEntityType;
  });

  const totalCount = filteredLogs.length;
  const totalPages = Math.ceil(totalCount / PER_PAGE);
  const paginatedLogs = filteredLogs.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE,
  );

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Audit Logs
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Track all system activities and changes
          </p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <Select
                  value={eventTypeFilter}
                  onValueChange={setEventTypeFilter}
                >
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="TRANSACTION">Transactions</SelectItem>
                    <SelectItem value="USER">User Events</SelectItem>
                    <SelectItem value="BLOCKED">Blocked</SelectItem>
                    <SelectItem value="FLAGGED">Flagged</SelectItem>
                    <SelectItem value="SUCCESS">Success</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={entityTypeFilter}
                  onValueChange={setEntityTypeFilter}
                >
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Entity Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Entities</SelectItem>
                    <SelectItem value="Transaction">Transaction</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Audit Logs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {totalCount} Log Entr{totalCount !== 1 ? "ies" : "y"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {paginatedLogs.length === 0 && !isLoading ? (
                <EmptyState
                  icon={FileText}
                  title="No logs found"
                  description="Try adjusting your filter criteria"
                />
              ) : (
                <>
                  <AuditLogTable logs={paginatedLogs} isLoading={isLoading} />
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      totalCount={totalCount}
                      perPage={PER_PAGE}
                      onPageChange={setPage}
                    />
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
}
