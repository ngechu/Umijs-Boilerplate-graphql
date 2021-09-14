import { secureQueryAsync } from '@/hooks/useSecureGraphql';
import { gql } from 'graphql-request';

export async function useStatements() {
  const statementsQuery = gql`
    query RootQuery {
      getAllTransaction {
        postingSerialNumber
        narrative
        date
        debit
        credit
        balance
        id
      }
    }
  `;
  return await secureQueryAsync({ key: 'statements', query: statementsQuery });
}
