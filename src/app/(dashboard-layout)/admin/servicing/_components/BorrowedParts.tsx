'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const mockPersons = ['Al Amin', 'Rahim', 'Sattar'];

function PersonCombobox() {
  const [persons, setPersons] = useState(mockPersons);
  const [selected, setSelected] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = persons.filter(r =>
    r.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (person: string) => {
    setSelected(person);
    setInputValue(person);
    setIsOpen(false);
  };

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || persons.map(r => r.toLowerCase()).includes(trimmed.toLowerCase())) return;
    setPersons(prev => [...prev, trimmed]);
    setSelected(trimmed);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered.length === 1) {
        handleSelect(filtered[0]);
      } else if (!filtered.some(r => r.toLowerCase() === inputValue.toLowerCase())) {
        handleAdd();
      }
    }
    if (e.key === 'Escape') setIsOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const showAddOption =
    inputValue.trim() &&
    !persons.some(r => r.toLowerCase() === inputValue.toLowerCase());

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Input
          placeholder="Select or add person..."
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pr-8"
        />
        <ChevronDown
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer"
          onClick={() => setIsOpen(o => !o)}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-lg">
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.map(person => (
              <li
                key={person}
                className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                onMouseDown={e => { e.preventDefault(); handleSelect(person); }}
              >
                {person === selected && <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
                <span className={person === selected ? 'ml-0' : 'ml-5.5'}>{person}</span>
              </li>
            ))}

            {filtered.length === 0 && !showAddOption && (
              <li className="px-3 py-2 text-sm text-muted-foreground">No person found</li>
            )}

            {showAddOption && (
              <li
                className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer text-primary hover:bg-primary/10 border-t border-border"
                onMouseDown={e => { e.preventDefault(); handleAdd(); }}
              >
                <Plus className="w-4 h-4" />
                Add "{inputValue.trim()}"
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function BorrowedParts({ onPartsCostChange }: { onPartsCostChange?: (cost: number) => void }) {
  const [partsType, setPartsType] = useState<'own' | 'borrowed' | null>(null);
  const [ownCost, setOwnCost] = useState(0);
  const [borrowedCost, setBorrowedCost] = useState(0);

  useEffect(() => {
    if (onPartsCostChange) {
      if (partsType === 'own') onPartsCostChange(ownCost);
      else if (partsType === 'borrowed') onPartsCostChange(borrowedCost);
      else onPartsCostChange(0);
    }
  }, [partsType, ownCost, borrowedCost, onPartsCostChange]);

  return (
    <div className="card-base p-6 space-y-4">
      <h3 className="font-semibold text-lg">Parts Usage</h3>
      
      <div>
        <Label>Parts Type *</Label>
        <Select value={partsType || ''} onValueChange={(v: any) => setPartsType(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="own">Own Parts</SelectItem>
            <SelectItem value="borrowed">Borrowed Parts (Dhar)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {partsType === 'own' && (
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div>
            <Label>Part Name</Label>
            <Input placeholder="e.g., Screen" />
          </div>
          <div>
            <Label>Qty</Label>
            <Input type="number" defaultValue="1" />
          </div>
          <div className="col-span-2">
            <Label>Part Cost (৳)</Label>
            <Input 
              type="number" 
              placeholder="0" 
              value={ownCost || ''}
              onChange={(e) => setOwnCost(Number(e.target.value))}
            />
          </div>
        </div>
      )}

      {partsType === 'borrowed' && (
        <div className="space-y-4 pt-2 border-t">
          <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
            <p className="text-sm font-medium text-orange-900 dark:text-orange-100">Borrowed Parts Tracking</p>
            <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">Record borrowed parts for future reference</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Borrow From (Person Name) *</Label>
              <PersonCombobox />
            </div>
            <div>
              <Label>Part Name *</Label>
              <Input placeholder="e.g., Display" required />
            </div>
            <div>
              <Label>Total Amount (৳) *</Label>
              <Input 
                type="number" 
                placeholder="0" 
                required 
                value={borrowedCost || ''}
                onChange={(e) => setBorrowedCost(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
