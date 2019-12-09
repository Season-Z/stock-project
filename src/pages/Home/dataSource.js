export const Nav00DataSource = {
  page: { className: 'home-page' },
  logo: {
    children: 'https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg',
  },
  Menu: {
    children: [
      {
        name: 'item1',
        className: 'header0-item',
        children: {
          href: '/login',
          children: [{ children: '登录', name: 'text' }],
        },
      },
    ],
  },
};

const textData = {
  content:
    'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
    ' the motorcycle referred to in the mainland, Hong Kong and Southeast' +
    ' Asia known as motorcycles.',
  title: 'Motorcycle',
};
let dataArray = [
  { image: 'https://zos.alipayobjects.com/rmsportal/DGOtoWASeguMJgV.png' },
  { image: 'https://zos.alipayobjects.com/rmsportal/BXJNKCeUSkhQoSS.png' },
  { image: 'https://zos.alipayobjects.com/rmsportal/TDIbcrKdLWVeWJM.png' },
  { image: 'https://zos.alipayobjects.com/rmsportal/SDLiKqyfBvnKMrA.png' },
  { image: 'https://zos.alipayobjects.com/rmsportal/UcVbOrSDHCLPqLG.png' },
  { image: 'https://zos.alipayobjects.com/rmsportal/QJmGZYJBRLkxFSy.png' },
  { image: 'https://zos.alipayobjects.com/rmsportal/PDiTkHViQNVHddN.png' },
  { image: 'https://zos.alipayobjects.com/rmsportal/beHtidyjUMOXbkI.png' },
  { image: 'https://zos.alipayobjects.com/rmsportal/vJcpMCTaSKSVWyH.png' },
  { image: 'https://zos.alipayobjects.com/rmsportal/dvQuFtUoRmvWLsZ.png' },
  { image: 'https://zos.alipayobjects.com/rmsportal/QqWQKvgLSJaYbpr.png' },
  { image: 'https://zos.alipayobjects.com/rmsportal/pTfNdthdsUpLPLJ.png' },
];
export const imagesList = (dataArray = dataArray.map(item => ({ ...item, ...textData })));
