import React from 'react';
import ForgeReconciler, { Select, Heading, Text, Link, Box, Inline, ProgressBar, xcss } from '@forge/react';  // BoxとInlineを追加でインポート


const ProgressBarSuccessExample = () => {
 return (
  <ProgressBar
   appearance="success"
   ariaLabel="Done: 3 of 10 issues"
   value={0.3}
  />

 );
};


const SelectProject = () => {
 return (
  <>
   <Box
    padding='space.200'
   >
    <Heading as="h1">Custom Field Statistics</Heading>
   </Box>

   <Box
    xcss={{
     borderWidth: 'border.width'
    }}
   >
    <Select
     xcss={{
      borderWidth: 'border.width'
     }}
     appearance="default"
     options={[
      { label: 'Project A', value: 'A' },
      { label: 'Project B', value: 'B' },
     ]}
    />
   </Box>

  </>
 );
}


// const TextStyle = xcss({
//  color: 'color.text'
// });

// InlineExampleコンポーネントの定義
const InlineExample = () => {
 return (
  <>

   <Inline
    padding='space.200'
   >
    <Box
     padding='space.200'
     xcss={{
      color: 'color.text.accent.red'
     }}
    >
     <Text>Name</Text>
    </Box>
    <Box
     padding='space.200'
     xcss={{
      color: 'color.text.accent.red'
     }}
    >
     <Text>Empty Value Rate</Text>
    </Box>
    <Box
     padding='space.200'
     xcss={{
      color: 'color.text.accent.red'
     }}
    >
     <Text>Empty Value Issues</Text>
    </Box>

   </Inline>
   <Inline>
    <Box
     padding='space.200'
    // backgroundColor='color.background.discovery'
    >
     <Heading as="h2">Partner</Heading>
    </Box>
    <ProgressBarSuccessExample />
    <Box
     padding='space.200'
    >
     <Text>
      <Link>6issues</Link>
     </Text>
    </Box>
   </Inline>
   <Inline>
    <Box
     padding='space.200'
    >
     <Heading as="h2">Net View</Heading>
    </Box>
    <ProgressBarSuccessExample />
    <Box
     padding='space.200'
    >
     <Text>
      <Link>6issues</Link>
     </Text>
    </Box>
   </Inline>
   <Inline>
    <Box
     padding='space.200'
    >
     <Heading as="h2">Gross Value</Heading>
    </Box>
    <ProgressBarSuccessExample />
    <Box
     padding='space.200'
    >
     <Text>
      <Link>6issues</Link>
     </Text>
    </Box>
   </Inline>
  </>
 );
};

// Appコンポーネントの定義
const App = () => {
 return (
  <>
   <InlineExample />  {/* InlineExampleをここに追加 */}
  </>
 );
};

// ForgeReconcilerでのレンダリング
ForgeReconciler.render(
 <React.StrictMode>
  <SelectProject />
  <App />
 </React.StrictMode>
);