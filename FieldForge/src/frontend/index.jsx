import React from 'react';
import ForgeReconciler, { Box, DynamicTable, Heading, Tab, Tabs, TabPanel, TabList, Link, PieChart, xcss } from '@forge/react';

const App = () => {

  const linkUrl = "https://www.atlassian.com/";

  const generatePieChartWithPercentage = (percentage) => (
    <Box xcss={{ display: 'flex', alignItems: 'center' }}>
      <PieChart
        data={[
          [ 'white', 'Filled', (100 - percentage) ],
          [ 'orange','Empty', percentage ]
        ]}
        width={200}
        height={200}
        colorAccessor={0} 
        labelAccessor={1} 
        valueAccessor={2} 
      />
      <Box xcss={{ marginLeft: '8px' }}>{percentage}%</Box>
    </Box>
  );

  const dataA = [
    { id: '1', cells: [{ content: <Heading as='h2'>Partner</Heading> }, { content: generatePieChartWithPercentage(70) }, { content: <Link href={linkUrl}>21 issues</Link> }] },
    { id: '2', cells: [{ content: <Heading as='h2'>Net view</Heading> }, { content: generatePieChartWithPercentage(50) }, { content: <Link href={linkUrl}>15 issues</Link> }] },
    { id: '3', cells: [{ content: <Heading as='h2'>VAT</Heading> }, { content: generatePieChartWithPercentage(50) }, { content: <Link href={linkUrl}>15 issues</Link> }] },
    { id: '4', cells: [{ content: <Heading as='h2'>Gross Value</Heading> }, { content: generatePieChartWithPercentage(30) }, { content: <Link href={linkUrl}>9 issues</Link> }] }
  ];

  const dataB = [
    { id: '1', cells: [{ content: <Heading as='h2'>Partner</Heading> }, { content: generatePieChartWithPercentage(30) }, { content: <Link href={linkUrl}>9 issues</Link> }] },
    { id: '2', cells: [{ content: <Heading as='h2'>Net view</Heading> }, { content: generatePieChartWithPercentage(60) }, { content: <Link href={linkUrl}>18 issues</Link> }] },
    { id: '3', cells: [{ content: <Heading as='h2'>VAT</Heading> }, { content: generatePieChartWithPercentage(20) }, { content: <Link href={linkUrl}>6 issues</Link> }] },
    { id: '4', cells: [{ content: <Heading as='h2'>Gross Value</Heading> }, { content: generatePieChartWithPercentage(10) }, { content: <Link href={linkUrl}>3 issues</Link> }] }
  ];

  const dataC = [
    { id: '1', cells: [{ content: <Heading as='h2'>Partner</Heading> }, { content: generatePieChartWithPercentage(50) }, { content: <Link href={linkUrl}>15 issues</Link> }] },
    { id: '2', cells: [{ content: <Heading as='h2'>Net view</Heading> }, { content: generatePieChartWithPercentage(50) }, { content: <Link href={linkUrl}>15 issues</Link> }] },
    { id: '3', cells: [{ content: <Heading as='h2'>VAT</Heading> }, { content: generatePieChartWithPercentage(30) }, { content: <Link href={linkUrl}>9 issues</Link> }] },
    { id: '4', cells: [{ content: <Heading as='h2'>Gross Value</Heading> }, { content: generatePieChartWithPercentage(30) }, { content: <Link href={linkUrl}>9 issues</Link> }] }
  ];

  return (
    <>
      <Heading as="h1">Custom Filled Statistics</Heading>
      <Tabs id="default">
        <TabList>
          <Tab>ProjectA</Tab>
          <Tab>ProjectB</Tab>
          <Tab>ProjectC</Tab>
        </TabList>

        <TabPanel>
          <Box xcss={{ width: '80%', padding: '8px', margin: 'space.200' }}>
            <DynamicTable
              rowsPerPage={5}
              head={{
                cells: [
                  { content: 'Name', isSortable: true },
                  { content: 'Empty Value Rate', isSortable: true },
                  { content: 'Empty Value Issues', isSortable: true }
                ]
              }}
              rows={dataA}
            />
          </Box>
        </TabPanel>

        <TabPanel>
          <Box xcss={{ width: '80%', padding: '8px', margin: 'space.200' }}>
            <DynamicTable
              rowsPerPage={5}
              head={{
                cells: [
                  { content: 'Name', isSortable: true },
                  { content: 'Empty Value Rate', isSortable: true },
                  { content: 'Empty Value Issues', isSortable: true }
                ]
              }}
              rows={dataB}
            />
          </Box>
        </TabPanel>

        <TabPanel>
          <Box xcss={{ width: '80%', padding: '8px', margin: 'space.200' }}>
            <DynamicTable
              rowsPerPage={5}
              head={{
                cells: [
                  { content: 'Name', isSortable: true },
                  { content: 'Empty Value Rate', isSortable: true },
                  { content: 'Empty Value Issues', isSortable: true }
                ]
              }}
              rows={dataC}
            />
          </Box>
        </TabPanel>
      </Tabs>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);