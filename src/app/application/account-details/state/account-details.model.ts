export interface AccountDetail {
    AccountName: string;
    AccountNumber: string;
    AccountType: string;
    AccountUserId: string;
    CreatedAt: string;
    Id: string;
    InstitutionName: string;
}

export function createAccountDetail(account: AccountDetail | null) {
   let accountDetail: AccountDetail = {
    AccountName: account?.AccountName || '',
    AccountNumber: account?.AccountNumber ||'',
    AccountType: account?.AccountType ||'',
    AccountUserId:account?.AccountUserId || '',
    CreatedAt: account?.CreatedAt ||'',
    Id: account?.Id ||'',
    InstitutionName: account?.InstitutionName ||''
   }
   return accountDetail;
}