import React, { useCallback, useEffect, useRef, useState } from 'react';

import api from '../../services/api';

interface Register {
  title: string;
  id: string;
}

const ListRegisters: React.FC<{ url: string }> = ({ url }: { url: string }) => {
  const [registers, setRegisters] = useState<Register[]>([]);

  useEffect(() => {
    api.get<Register[]>(url).then(response => {
      const { data } = response;
      setRegisters(data);
    });
  }, [url]);

  return (
    <ul>
      {registers.map(register => {
        return <li key={register.id}>{register.title}</li>;
      })}
    </ul>
  );
};

export default ListRegisters;
