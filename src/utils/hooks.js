import React, { useState } from 'react';

function usePage() {
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
    count: 0,
    data: [],
  });
}
