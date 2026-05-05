# SawaSave - Digital Group Savings for Juba, South Sudan

## Overview

SawaSave is a mobile-first group savings application designed for trusted savings circles in Juba, South Sudan. The app digitizes traditional rotating savings and credit associations (ROSCAs) where members create or join groups, contribute agreed amounts, rotate payouts, and access group-backed loans.

## Important: MVP Money Model

**The MVP does NOT hold real funds directly.** All wallets are ledger-only. Real money is held by group-controlled bank/mobile money accounts outside the app. The app records and governs:
- Contributions
- Loans
- Payouts
- Receipts
- Approvals
- Balances

## Project Structure

```
sawasave/
├── backend/           # NestJS API server
│   ├── src/          # Source code
│   ├── test/         # Tests
│   ├── config/       # Configuration files
│   └── docs/         # Documentation
├── mobile/           # Flutter mobile app
└── README.md
```

## Recommended Technology Stack

### Backend
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT with phone number + PIN
- **File Storage**: Local (dev) / S3-compatible (production)

### Mobile
- **Framework**: Flutter (Android & iOS)
- **State Management**: Provider or Riverpod
- **HTTP Client**: Dio

## Core Features (MVP)

1. **Authentication & Profile**: Phone registration, PIN setup, KYC fields
2. **Group Creation**: Constitution setup, member invitations, rule configuration
3. **Contributions**: Schedule generation, payment proof upload, treasurer confirmation
4. **Ledger System**: Immutable double-entry style ledger for group and member wallets
5. **Payouts**: Fixed order rotation, deduction calculations, approval workflow
6. **Loans**: Eligibility checks, maximum loan limits, guarantor system, repayments
7. **Reports**: Receipts, statements, CSV/PDF exports
8. **Audit Logs**: Complete trail of all sensitive actions

## User Roles

- **Platform Super Admin**: System oversight
- **Group Admin/Chairperson**: Group management
- **Treasurer**: Payment confirmations, payout releases
- **Secretary/Auditor**: Oversight and auditing
- **Member**: Regular participant
- **Guarantor**: Contextual role for loan guarantees

## Key Business Rules

- Groups can use SSP (South Sudan Pound) or USD, but no currency conversion in MVP
- Group rules cannot be changed silently after activation (versioned rule sets)
- Balances computed from immutable ledger entries only
- Never allow direct manual balance editing
- Loan maximum = lowest of: 50% of expected payout, available wallet, group cap, borrower risk limit
- Borrower cannot approve their own loan
- Guarantor cannot be the borrower
- Overdue loans trigger reminders, borrowing blocks, penalties, and guarantor notifications

## Getting Started

### Backend Setup

```bash
cd backend
npm install
# Configure environment variables
cp .env.example .env
# Run migrations
npm run typeorm migration:run
# Start development server
npm run start:dev
```

### Mobile Setup

```bash
cd mobile
flutter pub get
flutter run
```

## Environment Variables

```
DATABASE_URL=postgresql://user:password@localhost:5432/sawasave
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
PORT=3000
NODE_ENV=development
```

## Testing

```bash
# Backend tests
npm run test
npm run test:cov

# Mobile tests
flutter test
```

## License

MIT License

## Disclaimer

This software is provided as-is. Before handling real funds, consult a South Sudan-qualified legal adviser and engage the Bank of South Sudan or a licensed financial institution. This is not legal advice.
