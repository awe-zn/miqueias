import { useForm, usePage } from '@inertiajs/inertia-react';
import { useEffect } from 'react';
import { Form } from 'react-bootstrap';

export const Security = () => {
  const { notifications } = usePage().props;

  const { data, setData, put } = useForm({
    ...notifications,
  });

  useEffect(() => {
    put(route('profile.notifications'));
  }, [data]);

  return (
    <div>
      <Form.Check
        type="switch"
        label="Notificar eventos"
        checked={data.events}
        onChange={() => setData('events', !data.events)}
      />
      <Form.Check
        type="switch"
        label="Notificar tarefas"
        checked={data.tasks}
        onChange={() => setData('tasks', !data.tasks)}
      />
    </div>
  );
};
