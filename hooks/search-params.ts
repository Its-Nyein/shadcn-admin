import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";

export const DEFAULT_PAGE_SIZE = 10;

export function useTransactionsSearchParams() {
  return useQueryStates(
    {
      search: parseAsString.withDefault("").withOptions({ history: "replace" }),
      status: parseAsArrayOf(parseAsString, ",").withDefault([]),
      method: parseAsArrayOf(parseAsString, ",").withDefault([]),
      gateway: parseAsArrayOf(parseAsString, ",").withDefault([]),
      page: parseAsInteger.withDefault(1),
      perPage: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
    },
    {
      history: "push",
      shallow: true,
    },
  );
}

export function useDashboardSearchParams() {
  return useQueryStates(
    {
      range: parseAsString.withDefault("90d"),
      tab: parseAsString.withDefault("outline"),
      page: parseAsInteger.withDefault(1),
      perPage: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
    },
    {
      history: "replace",
      shallow: true,
    },
  );
}

export function usePaymentDashboardSearchParams() {
  return useQueryStates(
    {
      metric: parseAsString.withDefault("volume"),
      timeRange: parseAsString.withDefault("3m"),
      period: parseAsString.withDefault("month"),
      analyticsTab: parseAsString.withDefault("hourly"),
    },
    {
      history: "replace",
      shallow: true,
    },
  );
}

export function useTasksSearchParams() {
  return useQueryStates(
    {
      search: parseAsString.withDefault("").withOptions({ history: "replace" }),
      status: parseAsArrayOf(parseAsString, ",").withDefault([]),
      priority: parseAsArrayOf(parseAsString, ",").withDefault([]),
      page: parseAsInteger.withDefault(1),
      perPage: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
    },
    {
      history: "push",
      shallow: true,
    },
  );
}

export function useMailSearchParams() {
  return useQueryStates(
    {
      search: parseAsString.withDefault("").withOptions({ history: "replace" }),
      tab: parseAsString.withDefault("all"),
    },
    {
      history: "replace",
      shallow: true,
    },
  );
}

export function useUsersSearchParams() {
  return useQueryStates(
    {
      search: parseAsString.withDefault("").withOptions({ history: "replace" }),
      role: parseAsString.withDefault(""),
      plan: parseAsString.withDefault(""),
      status: parseAsString.withDefault(""),
      page: parseAsInteger.withDefault(1),
      perPage: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
    },
    {
      history: "push",
      shallow: true,
    },
  );
}

export function useChatsSearchParams() {
  return useQueryStates(
    {
      search: parseAsString.withDefault("").withOptions({ history: "replace" }),
    },
    {
      history: "replace",
      shallow: true,
    },
  );
}

export function useDashboard2SearchParams() {
  return useQueryStates(
    {
      dateRange: parseAsString.withDefault("30d"),
      salesRange: parseAsString.withDefault("12m"),
      category: parseAsString.withDefault("sales"),
      insights: parseAsString.withDefault("growth"),
    },
    {
      history: "replace",
      shallow: true,
    },
  );
}
