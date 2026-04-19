'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Save, ChevronDown, Check, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import BorrowedParts from '../_components/BorrowedParts';

const mockTechnicians = ['Rafiq', 'Hasan', 'Jamal'];

function TechnicianCombobox() {
  const [technicians, setTechnicians] = useState(mockTechnicians);
  const [selected, setSelected] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = technicians.filter(r =>
    r.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (tech: string) => {
    setSelected(tech);
    setInputValue(tech);
    setIsOpen(false);
  };

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || technicians.map(r => r.toLowerCase()).includes(trimmed.toLowerCase())) return;
    setTechnicians(prev => [...prev, trimmed]);
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
    !technicians.some(r => r.toLowerCase() === inputValue.toLowerCase());

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Input
          placeholder="Select or add technician..."
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
            {filtered.map(tech => (
              <li
                key={tech}
                className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                onMouseDown={e => { e.preventDefault(); handleSelect(tech); }}
              >
                {tech === selected && <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
                <span className={tech === selected ? 'ml-0' : 'ml-5.5'}>{tech}</span>
              </li>
            ))}

            {filtered.length === 0 && !showAddOption && (
              <li className="px-3 py-2 text-sm text-muted-foreground">No technician found</li>
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

export default function NewServiceJobPage() {
  const [partsCost, setPartsCost] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  const total = serviceCharge + partsCost;
  const due = total - paidAmount;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/servicing">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Add Service Job</h1>
          <p className="text-muted-foreground">Create new repair/service job</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <div className="card-base p-6 space-y-4">
            <h3 className="font-semibold text-lg">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Customer Phone</Label>
                <Input placeholder="Enter phone number" />
              </div>
              <div>
                <Label>Customer Name</Label>
                <Input placeholder="Enter name" />
              </div>
            </div>
          </div>

          {/* Device Info */}
          <div className="card-base p-6 space-y-4">
            <h3 className="font-semibold text-lg">Device Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Device Model *</Label>
                <Input placeholder="e.g., iPhone 14 Pro" required />
              </div>
              <div>
                <Label>IMEI</Label>
                <Input placeholder="Enter IMEI" />
              </div>
              <div className="col-span-2">
                <Label>Problem / Issue *</Label>
                <Textarea placeholder="Describe the problem..." rows={3} required />
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="card-base p-6 space-y-4">
            <h3 className="font-semibold text-lg">Service Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Service Type *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="hardware">Hardware</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Technician</Label>
                <TechnicianCombobox />
              </div>
              <div>
                <Label>Estimated Delivery</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Status *</Label>
                <Select defaultValue="working" required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="working">Working</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Parts */}
          <BorrowedParts onPartsCostChange={setPartsCost} />
        </div>

        {/* Pricing */}
        <div className="space-y-6">
          <div className="card-base p-6 space-y-4">
            <h3 className="font-semibold text-lg">Pricing</h3>
            <div>
              <Label>Service Charge (৳) *</Label>
              <Input 
                type="number" 
                placeholder="0" 
                required 
                value={serviceCharge || ''}
                onChange={(e) => setServiceCharge(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Parts Cost (৳)</Label>
              <Input 
                type="number" 
                placeholder="0" 
                value={partsCost || ''}
                readOnly
                className="bg-muted"
                tabIndex={-1}
              />
            </div>
            <div className="pt-3 border-t">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>৳{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="card-base p-6 space-y-4">
            <h3 className="font-semibold text-lg">Payment</h3>
            <div>
              <Label>Paid Amount (৳)</Label>
              <Input 
                type="number" 
                placeholder="0" 
                value={paidAmount || ''}
                onChange={(e) => setPaidAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Payment Method</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bkash">bKash</SelectItem>
                  <SelectItem value="nagad">Nagad</SelectItem>
                  <SelectItem value="bank">Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-3 border-t">
              <div className="flex justify-between text-red-600">
                <span>Due</span>
                <span className="font-bold">৳{due > 0 ? due.toLocaleString() : 0}</span>
              </div>
            </div>
          </div>

          <Button className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Job
          </Button>
          <Link href="/admin/servicing">
            <Button variant="outline" className="w-full">Cancel</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
