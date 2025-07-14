
import { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Select, SelectItem } from './components/ui/select';

export default function App() {
  const [briefPages, setBriefPages] = useState([{ title: '', content: '', link: '' }]);
  const [urgent, setUrgent] = useState(false);
  const [form, setForm] = useState({
    jobTitle: '', jobOwner: '', jobType: '', poOwner: '',
    marcom: '', designer: '', marcomDue: '', poDue: '',
    qty: '', workType: '', output: '', draft1: '', status: '', remarks: ''
  });

  const jobOwners = ['Roof', 'Chanel', 'CW', 'Metal', 'Event'];
  const team = ['พี่พท', 'พี่จ๋า', 'วิน'];
  const designers = ['คุณเบส', 'คุณซัน', 'คุณกอล์ฟ', 'วิน'];
  const types = ['online single', 'online album', 'printing', 'leaflet or brochure', 'adjust', 'VDO', 'Figma', 'display', 'exhibition'];
  const outputs = ['AW', 'Design+Product', 'Production', 'Clip', 'Support'];
  const statuses = ['Draft', 'รอ Brief', 'รอ comment', 'Done', 'รอ ออกแบบ', 'Hold', 'cancel'];

  const handleChange = (key, value) => setForm({ ...form, [key]: value });
  const handleBriefChange = (i, key, value) => {
    const updated = [...briefPages];
    updated[i][key] = value;
    setBriefPages(updated);
  };
  const addBriefPage = () => setBriefPages([...briefPages, { title: '', content: '', link: '' }]);

  const submitForm = () => {
    const jobNo = `2507-${String(Math.floor(Math.random() * 99 + 1)).padStart(2, '0')}`;
    console.log({ ...form, briefPages, urgent, jobNo });
    alert(`✅ ส่งงานเรียบร้อย!\n${urgent ? '⚠ แจ้งเตือนงานเร่งด่วนแล้ว!' : ''}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold">ลงคิวงานนักออกแบบ</h1>
      <Input placeholder="ชื่องาน" onChange={e => handleChange('jobTitle', e.target.value)} />
      <Select onValueChange={val => handleChange('jobOwner', val)}>{jobOwners.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</Select>
      <Input placeholder="ประเภทงาน" onChange={e => handleChange('jobType', e.target.value)} />
      <Input placeholder="ชื่อผู้บรีฟ (PO)" onChange={e => handleChange('poOwner', e.target.value)} />
      <Select onValueChange={val => handleChange('marcom', val)}>{team.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</Select>
      <Select onValueChange={val => handleChange('designer', val)}>{designers.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</Select>
      <div className="flex gap-4">
        <Input type="date" onChange={e => handleChange('poDue', e.target.value)} />
        <Input type="date" onChange={e => handleChange('marcomDue', e.target.value)} />
      </div>
      <Input type="number" placeholder="จำนวนงาน" onChange={e => handleChange('qty', e.target.value)} />
      <Select onValueChange={val => handleChange('workType', val)}>{types.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</Select>
      <Select onValueChange={val => handleChange('output', val)}>{outputs.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</Select>
      <Textarea placeholder="Draft 1" onChange={e => handleChange('draft1', e.target.value)} />
      <Select onValueChange={val => handleChange('status', val)}>{statuses.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</Select>
      <Textarea placeholder="หมายเหตุเพิ่มเติม" onChange={e => handleChange('remarks', e.target.value)} />
      <label className="flex items-center gap-2">
        <input type="checkbox" onChange={e => setUrgent(e.target.checked)} /> งานเร่งด่วน
      </label>
      <div className="space-y-2">
        <h2 className="text-lg font-medium">📄 แผ่นงานบรีฟ ({briefPages.length})</h2>
        {briefPages.map((p, i) => (
          <div key={i} className="p-3 bg-gray-50 border rounded space-y-2">
            <Input placeholder="หัวข้อ" value={p.title} onChange={e => handleBriefChange(i, 'title', e.target.value)} />
            <Textarea placeholder="เนื้อหา/รายละเอียด" value={p.content} onChange={e => handleBriefChange(i, 'content', e.target.value)} />
            <Input placeholder="แนบลิงก์ (URL)" value={p.link} onChange={e => handleBriefChange(i, 'link', e.target.value)} />
          </div>
        ))}
        <Button variant="outline" onClick={addBriefPage}>+ เพิ่มแผ่นงาน</Button>
      </div>
      <Button className="w-full" onClick={submitForm}>📤 ส่งบรีฟ</Button>
    </div>
  );
}
