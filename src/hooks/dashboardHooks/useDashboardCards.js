import { useSecureGraphql } from '@/hooks/useSecureGraphql';
import { gql } from 'graphql-request';

export function useDashboardCards() {
  const dashboardCardsQuery = gql`
    query RootQuery {
      getTotalJournalSummary {
        debit
        credit
        balance
      }
      getAllOrderSummary {
        totalAmount
        date
        status
      }
      getAllJournalSummary {
        debit
        credit
        date
      }
      getAllOrderSummaryByCountry {
        country
        totalCount
      }
    }
  `;
  return useSecureGraphql({ key: 'dashboardCards', query: dashboardCardsQuery });
}
