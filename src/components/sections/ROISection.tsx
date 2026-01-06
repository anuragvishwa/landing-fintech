"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, TrendingDown, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { fadeInUp } from "@/lib/animations";

// Slider input component
function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix = "",
  suffix = "",
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-secondary-300">{label}</span>
        <span className="text-sm font-semibold text-white">
          {prefix}{value.toLocaleString()}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-secondary-700 rounded-lg appearance-none cursor-pointer accent-primary-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary-500/30 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-primary-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
      />
      <div className="flex justify-between text-xs text-secondary-500">
        <span>{prefix}{min.toLocaleString()}{suffix}</span>
        <span>{prefix}{max.toLocaleString()}{suffix}</span>
      </div>
    </div>
  );
}

export function ROISection() {
  // Interactive state
  const [ticketsPerMonth, setTicketsPerMonth] = useState(800);
  const [minutesPerTicket, setMinutesPerTicket] = useState(12);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [reductionPercent, setReductionPercent] = useState(40);

  // Calculated values
  const calculations = useMemo(() => {
    const totalMinutes = ticketsPerMonth * minutesPerTicket;
    const totalHours = totalMinutes / 60;
    const monthlyCost = Math.round(totalHours * hourlyRate);
    const monthlySavings = Math.round(monthlyCost * (reductionPercent / 100));
    const afterFlexdash = monthlyCost - monthlySavings;
    const annualSavings = monthlySavings * 12;

    return {
      totalMinutes,
      totalHours: Math.round(totalHours),
      monthlyCost,
      monthlySavings,
      afterFlexdash,
      annualSavings,
    };
  }, [ticketsPerMonth, minutesPerTicket, hourlyRate, reductionPercent]);

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />

      <Container className="relative z-10">
        <SectionHeading
          badge="ROI Calculator"
          title="Calculate your savings"
          description="Adjust the sliders to see your potential cost reduction with Flexdash."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 rounded-2xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
            {/* Inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Interactive ROI Calculator</h3>
                  <p className="text-secondary-400 text-sm">Drag sliders to customize</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-6">
                  <h4 className="text-sm font-medium text-secondary-400 uppercase tracking-wider">
                    Your Current Support Load
                  </h4>

                  <SliderInput
                    label="Billing/how-to tickets per month"
                    value={ticketsPerMonth}
                    onChange={setTicketsPerMonth}
                    min={100}
                    max={5000}
                    step={50}
                  />

                  <SliderInput
                    label="Average time per ticket"
                    value={minutesPerTicket}
                    onChange={setMinutesPerTicket}
                    min={5}
                    max={30}
                    step={1}
                    suffix=" min"
                  />

                  <SliderInput
                    label="Blended agent cost"
                    value={hourlyRate}
                    onChange={setHourlyRate}
                    min={15}
                    max={75}
                    step={5}
                    prefix="$"
                    suffix="/hr"
                  />

                  <div className="pt-4 border-t border-secondary-700/50">
                    <SliderInput
                      label="Expected ticket reduction with Flexdash"
                      value={reductionPercent}
                      onChange={setReductionPercent}
                      min={20}
                      max={60}
                      step={5}
                      suffix="%"
                    />
                  </div>
                </div>

                {/* Output */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-secondary-400 uppercase tracking-wider">
                    Your Potential Savings
                  </h4>

                  {/* Before/After comparison */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Before */}
                    <div className="bg-secondary-800/50 rounded-xl p-4 border border-secondary-700/50">
                      <p className="text-xs text-secondary-400 mb-2">Current Monthly Cost</p>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-5 h-5 text-secondary-400" />
                        <AnimatedCounter
                          value={calculations.monthlyCost}
                          prefix="$"
                          className="text-2xl font-bold text-secondary-300"
                        />
                      </div>
                      <p className="text-xs text-secondary-500 mt-1">
                        {calculations.totalHours} hrs/mo
                      </p>
                    </div>

                    {/* After */}
                    <div className="bg-green-900/30 rounded-xl p-4 border border-green-500/30">
                      <p className="text-xs text-green-400 mb-2">With Flexdash</p>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-5 h-5 text-green-400" />
                        <AnimatedCounter
                          value={calculations.afterFlexdash}
                          prefix="$"
                          className="text-2xl font-bold text-green-400"
                        />
                      </div>
                      <p className="text-xs text-green-500/70 mt-1">
                        {reductionPercent}% reduction
                      </p>
                    </div>
                  </div>

                  {/* Monthly Savings */}
                  <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-5 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <TrendingDown className="w-6 h-6 text-white/80" />
                      <span className="text-sm text-primary-200">Monthly Savings</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <AnimatedCounter
                        value={calculations.monthlySavings}
                        prefix="$"
                        suffix="/mo"
                        className="text-4xl font-bold text-white"
                      />
                    </div>
                  </div>

                  {/* Annual Savings */}
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-5 text-center relative overflow-hidden"
                  >
                    <div className="absolute top-2 right-2">
                      <Sparkles className="w-5 h-5 text-yellow-300/60" />
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-sm text-green-200">Annual Savings</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <AnimatedCounter
                        value={calculations.annualSavings}
                        prefix="$"
                        suffix="/yr"
                        className="text-4xl font-bold text-white"
                      />
                    </div>
                  </motion.div>

                  {/* Calculation breakdown */}
                  <div className="p-3 bg-secondary-800/50 rounded-xl border border-secondary-700/50 overflow-x-auto">
                    <p className="text-[10px] sm:text-xs text-secondary-400 font-mono whitespace-nowrap">
                      {ticketsPerMonth.toLocaleString()} tickets × {minutesPerTicket} min = {calculations.totalMinutes.toLocaleString()} min = {calculations.totalHours} hrs
                    </p>
                    <p className="text-[10px] sm:text-xs text-secondary-400 font-mono mt-1 whitespace-nowrap">
                      {calculations.totalHours} hrs × ${hourlyRate}/hr = <span className="text-secondary-300">${calculations.monthlyCost.toLocaleString()}/mo</span>
                    </p>
                    <p className="text-[10px] sm:text-xs text-green-400 font-mono mt-1 whitespace-nowrap">
                      ${calculations.monthlyCost.toLocaleString()} × {reductionPercent}% = <span className="font-semibold">${calculations.monthlySavings.toLocaleString()}/mo saved</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer note */}
              <div className="mt-8 pt-6 border-t border-secondary-700/50">
                <p className="text-secondary-400 text-sm text-center">
                  These estimates are based on typical results from fintech SaaS teams using Flexdash for billing support.
                  <br />
                  <span className="text-primary-400">Actual results may vary. Book a demo to get a customized ROI analysis.</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
