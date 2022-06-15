import React from 'react';
import { useRouter } from 'next/router';

const Reports = () => {
  const router = useRouter();

  console.log(router.query.id);

  return <div>Reports</div>;
};

export default Reports;
