/**
 * This is a Next.js page.
 */
import { useRouter } from 'next/navigation';
import { trpc } from '../utils/trpc';

export default function IndexPage() {
  const router = useRouter();
  const result = trpc.greeting.useQuery({ name: 'client' });
  const setGreeting = trpc.setGreeting.useMutation({
    onSuccess: () => {
      router.refresh()
    },
  });

  const handleGreeting = () => {
    setGreeting.mutate({ name: 'haha' })
  }

  if (!result.data) {
    return (
      <div style={styles}>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div style={styles}>
      {/**
       * The type is defined and can be autocompleted
       * 💡 Tip: Hover over `data` to see the result type
       * 💡 Tip: CMD+Click (or CTRL+Click) on `text` to go to the server definition
       * 💡 Tip: Secondary click on `text` and "Rename Symbol" to rename it both on the client & server
       */}
      <h1>{result.data.text}</h1>
      <div>
        <button onClick={handleGreeting}>search</button>
      </div>
    </div>
  );
}

const styles = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
