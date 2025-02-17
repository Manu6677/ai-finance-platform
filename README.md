This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

----------------------------------------------NOTES--------------------------------------------------------------------------------

0. Create while application flow on paper with breakdown of component as pages and PRISMA WORKING ALSO SYNC WITH DATABASE AND SPABASE
1. Layout of Dashboard bit different why?
2. Component create-account-drawer, how it is written and what is that as a child and useState and prop={open}.
3. why schema of the form written in the lib folder and why it is inside the app folder
4. ...register('name')} what connection it is doing here in the input field - create-account-drawer compo
5. why we wrote onValueChange and how it works, what is defaultValue, why id='type' wrote - create-account-drawer compo
6. why to give id also in the <Switch /> ui component of shadcn and how it changes
   --> <Switch id='isDefault' onCheckedChange={(checked)=> setValue('isDefault', checked)}
   --> checked={watch('isDefault')}
   --> />


why React hook form better and need to be used.

1) Frequent Re-renders in Controlled Components
   Problem: Controlled components in React update state for every keystroke, leading to frequent re-renders of the parent component.
   React Hook Form Solution: Leverages uncontrolled components, which directly manage values in the DOM. React Hook Form syncs with React only when necessary (e.g., on submission or validation trigger), improving performance.
2) Boilerplate Code for Form State Management
   Problem: Managing form state (values, errors, touched, etc.) manually or with other libraries like Formik can lead to verbose and repetitive code.
   React Hook Form Solution: Provides a clean API with methods like register, handleSubmit, and watch, significantly reducing boilerplate.
3) Complex Validation Logic
   Problem: Validating form fields with custom logic or schema validation libraries (e.g., Yup or Zod) can be cumbersome and error-prone.
   React Hook Form Solution: Supports both built-in HTML5 validation (e.g., required, minLength) and external schema validation. Integrating with libraries like Yup is seamless.
4) Difficulty with Dynamic Forms
   Problem: Adding or removing fields dynamically (e.g., arrays of fields) is tricky to manage, especially with state-based approaches.
   React Hook Form Solution: Handles dynamic fields effortlessly using useFieldArray, ensuring that form state remains synchronized without additional effort.
5) Performance Issues with Large Forms
   Problem: Forms with many fields can become slow and unresponsive, especially when every change triggers state updates and re-renders.
   React Hook Form Solution: Updates only the specific field being interacted with, rather than re-rendering the entire form or parent component.
6) Integration with UI Libraries
   Problem: Many form libraries struggle to integrate with third-party UI libraries like Material-UI, Ant Design, or Chakra UI.
   React Hook Form Solution: Works seamlessly with custom or third-party UI components by forwarding ref and supporting uncontrolled components.
7) Managing Nested or Complex Form State
   Problem: Forms with nested structures (e.g., objects or arrays) require manual handling and state normalization.
   React Hook Form Solution: Supports deeply nested data structures out-of-the-box using dot notation (user.name, addresses[0].city).
8) Validation Error Management
   Problem: Managing and displaying validation errors requires additional effort in many libraries.
   React Hook Form Solution: Automatically tracks validation errors and provides them through the errors object, which integrates easily with the UI.
9) Lack of Flexibility
   Problem: Some libraries are opinionated or restrictive, making it hard to customize behavior.
   React Hook Form Solution: Offers great flexibility while remaining lightweight. You can customize behaviors, integrate schema validation, or work with native HTML validation.
10) Increased Bundle Size
    Problem: Many form libraries (e.g., Formik, Redux Form) add significant weight to your application’s bundle.
    React Hook Form Solution: Lightweight (~9 KB gzipped) and doesn’t depend on heavy state management libraries like Redux.



11) React Hook Form needs a resolver to translate Zod validation into its own error format:
: resolver: zodResolver(schema),

12) To Handle Uncontrolled Components
React Hook Form leverages uncontrolled components. Setting defaultValues ensures the form fields have an initial value directly linked to the DOM.

Example for watch():
const type = watch("type"); // "CURRENT" will be the initial value

Without defaultValues, watch() might return undefined for uninitialized fields.

1. defaultValue={watch('type')}
What it Does:

    The defaultValue prop initializes the selected value of the Select component.

    watch('type') retrieves the current value of the "type" field from the React Hook Form state.

    It ensures the Select component shows the correct value when the form is first rendered or when its state changes.

    -> Why It's Needed:
    When the form is loaded, the defaultValue ensures the Select reflects the current value of the "type" field, which could come from:
    Default values (defaultValues in useForm).
    Pre-loaded form data (e.g., for editing an existing entry).
    
2. onValueChange={(value) => setValue("type", value)}
What it Does:
    onValueChange is an event handler that triggers whenever the user selects a new value from the dropdown.
    It updates the "type" field in React Hook Form's internal state using setValue.
    How it Works:
    When a user selects an option (e.g., "CURRENT"), the onValueChange callback is executed with the selected value.
    setValue("type", value) updates the "type" field in React Hook Form's internal state to the new value.
    This ensures the form state is in sync with the user's input.
    Why It's Needed:
    React Hook Form works with uncontrolled components by default. For controlled components (like custom Select), we need to manually tell React Hook Form about the value changes.


1) onValueChange={(value) => setValue("type", value)}: This listens for when the user selects a new value in the select dropdown and updates the form state for the type field with the selected value.

2) setValue("type", value): This updates the form state with the selected value under the key type.

3) defaultValue={watch('type')}: watch is used to retrieve the current value of the type field from React Hook Form's state. defaultValue ensures that the select dropdown is initially populated with the correct value.

-----------------------------------------------------INNGEST---------------------------------------------------------

## What is Inngest?

Inngest is a modern event-driven serverless workflow and job scheduling platform. It enables developers to create workflows and execute background tasks, delayed jobs, or event-based tasks using APIs. It's particularly useful for modern cloud-based applications.

How it relates to cron jobs:

## Similarities:

Like a cron job, Inngest can be used to schedule tasks at regular intervals (e.g., "run this job every 15 minutes").
It is useful for recurring jobs, maintenance tasks, or any kind of periodic processing.
Differences:

Inngest is more flexible than cron jobs because it supports event-driven workflows. Tasks can be triggered not only by schedules but also by events (e.g., "trigger a workflow when a user signs up").

It integrates easily with serverless and cloud-native architectures, whereas traditional cron jobs often run on specific servers.
It provides better scalability and observability (e.g., monitoring, retries, and logs) compared to traditional cron jobs.


## Use Cases for Inngest:
Scheduled Tasks: Running periodic reports or clearing temporary data (similar to cron jobs).
Event-Driven Workflows: Trigger workflows based on application events, like payment processing or email notifications.
Chained Functions: Handle complex workflows by chaining functions with delays or conditions.
Serverless-friendly: Ideal for distributed and serverless applications where there are no fixed servers for cron.


## 1. Event-Driven Workflows:
Inngest supports event-driven workflows, which means tasks (or jobs) can be triggered by specific actions or events that happen within your application. This is different from cron jobs, which rely solely on fixed schedules.

## Example of Event-Driven Workflow:
Scenario: You want to send a welcome email when a user signs up.

With Cron Jobs: You might set up a periodic job that runs every few minutes and checks for new users to send emails to. This approach introduces delays and requires managing infrastructure.
With Inngest: The workflow can be triggered immediately when the "user signup" event occurs, without any delay. This makes it real-time and more efficient.
Inngest allows workflows to respond to events like:

 A new user signup.
 A payment failure.
 A file upload completion.
 2. Integration with Serverless and Cloud-Native Architectures:
 Traditional cron jobs run on a specific server, requiring you to:

## Maintain the server.
   Ensure uptime.
   Handle scaling and failover.
   In contrast, Inngest integrates easily with serverless and cloud-native platforms, which are designed to:

## Scale automatically: Handle more traffic without manual intervention.
   Eliminate server maintenance: The underlying infrastructure is managed by cloud providers.
   Increase reliability: Distributed systems ensure higher fault tolerance.
   Example of Cloud-Native Integration:
   If your app is built on serverless platforms like AWS Lambda, Google Cloud Functions, or Vercel, Inngest can seamlessly connect to these environments to trigger workflows without you having to manage additional servers or cron jobs.

## Key Takeaway: 
   Inngest offers flexibility by allowing tasks to be triggered:

On a fixed schedule (like cron jobs).
Immediately in response to events within your system.
And it removes the overhead of managing traditional infrastructure, making it ideal for modern applications.


Read sorting how it is work, why not working
Read useMemo hook working reallife example how it works, duplicate the transaction still work why?
Read about the Difference between the, setFilter((value)=>handleFilter(value)), setFilter(handleFilter)
 -> why to use value={filter} what is the need of it why it is required

 LEFT => Not rendering on real time, UI after deleted a record
 If the API Fails why not error useEffect works?
 Resolve Bug to delete many transactions -> after resolving bug see that why different fn call use for delete transaction one with deleteFn and other bulkDelete