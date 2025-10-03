import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchExpenditures } from '@/lib/api';
import { Expenditure } from '@/types/models';

// Fetch expenditures
export function useExpenditures() {
  return useQuery({
    queryKey: ['expenditures'],
    queryFn: fetchExpenditures,
    staleTime: 30000, // 30 seconds
  });
}

// Create, update, delete stubs
export function useCreateExpenditure() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => { throw new Error('Not implemented'); },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expenditures'] }),
  });
}

export function useUpdateExpenditure() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<Expenditure> }) => { throw new Error('Not implemented'); },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expenditures'] }),
  });
}

export function useDeleteExpenditure() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => { throw new Error('Not implemented'); },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expenditures'] }),
  });
}