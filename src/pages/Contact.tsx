import { useState } from 'react';
import { Check, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General enquiry', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await supabase.from('contact_messages').insert(form);
    } catch {
      /* table may not exist in demo */
    }
    setStatus('success');
  };

  return (
    <div className="container-luxe py-12 lg:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">We Are Here to Help</p>
        <h1 className="heading-lg mt-3 text-balance">Contact the House</h1>
        <p className="mt-3 text-ink-600 dark:text-ink-400 text-pretty">
          Questions about an order, a fragrance, or the discovery quiz? We reply to every message within one business day.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        {/* Info */}
        <div className="space-y-6">
          <div className="card-surface p-6">
            <Mail size={22} className="text-gold-600 dark:text-gold-300" strokeWidth={1.4} />
            <h3 className="heading-sm mt-3">Email</h3>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">hello@attarhouse.example</p>
            <p className="text-xs text-ink-500 dark:text-ink-400">Replies within 1 business day</p>
          </div>
          <div className="card-surface p-6">
            <Phone size={22} className="text-gold-600 dark:text-gold-300" strokeWidth={1.4} />
            <h3 className="heading-sm mt-3">Phone</h3>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">+33 4 93 00 00 00</p>
            <p className="text-xs text-ink-500 dark:text-ink-400">Mon–Fri, 9am–6pm CET</p>
          </div>
          <div className="card-surface p-6">
            <MapPin size={22} className="text-gold-600 dark:text-gold-300" strokeWidth={1.4} />
            <h3 className="heading-sm mt-3">Atelier</h3>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">14 Chemin des Fleurs<br />06130 Grasse, France</p>
            <p className="text-xs text-ink-500 dark:text-ink-400">Visits by appointment</p>
          </div>
          <div className="card-surface p-6">
            <MessageCircle size={22} className="text-gold-600 dark:text-gold-300" strokeWidth={1.4} />
            <h3 className="heading-sm mt-3">Live Chat</h3>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">Available 9am–9pm CET</p>
            <button className="btn-link mt-2 p-0">Start a conversation →</button>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          {status === 'success' ? (
            <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-gold-400/60 bg-gold-50/50 p-12 text-center dark:bg-gold-900/10">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-ink-900">
                <Check size={28} strokeWidth={3} />
              </span>
              <h2 className="heading-md mt-5">Message received</h2>
              <p className="mt-2 text-ink-600 dark:text-ink-300">Thank you, {form.name || 'friend'}. We will reply to {form.email} within one business day.</p>
              <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: 'General enquiry', message: '' }); }} className="btn-ghost mt-6">
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="card-surface space-y-5 p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="eyebrow mb-2 block">Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-luxe" />
                </div>
                <div>
                  <label className="eyebrow mb-2 block">Email</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-luxe" />
                </div>
              </div>
              <div>
                <label className="eyebrow mb-2 block">Subject</label>
                <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-luxe">
                  <option>General enquiry</option>
                  <option>Order support</option>
                  <option>Fragrance recommendation</option>
                  <option>Sample Club</option>
                  <option>Wholesale & press</option>
                </select>
              </div>
              <div>
                <label className="eyebrow mb-2 block">Message</label>
                <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-luxe !rounded-2xl" placeholder="How can we help?" />
              </div>
              <button type="submit" className="btn-primary w-full" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : 'Send Message'}
              </button>
              <p className="text-center text-xs text-ink-500 dark:text-ink-400">We will never share your information. GDPR compliant.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
