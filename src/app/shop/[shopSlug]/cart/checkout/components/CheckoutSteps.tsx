"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  id: number;
  name: string;
  completed: boolean;
  current: boolean;
}

interface CheckoutStepsProps {
  steps: Step[];
  currentStep: number;
  colors: any;
}

export default function CheckoutSteps({
  steps,
  currentStep,
  colors,
}: CheckoutStepsProps) {
  return (
    <div className="w-full mb-8">
      {/* Desktop version */}
      <div className="hidden md:block">
        <div className="max-w-2xl mx-auto px-8">
          <div className="relative flex items-center">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              const isLast = index === steps.length - 1;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center relative flex-1"
                >
                  {/* Step circle */}
                  <div
                    className="relative z-20 w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all duration-300 border-2"
                    style={{
                      backgroundColor:
                        isCompleted || isActive
                          ? colors.buttons.primary.background
                          : colors.background.primary,
                      borderColor:
                        isCompleted || isActive
                          ? colors.buttons.primary.background
                          : colors.background.secondary,
                      boxShadow: isActive
                        ? `0 0 0 4px ${colors.buttons.primary.background}20`
                        : "0 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                    ) : (
                      <span
                        className="text-sm font-semibold"
                        style={{
                          color: isActive
                            ? colors.buttons.primary.text
                            : colors.text.secondary,
                        }}
                      >
                        {step.id}
                      </span>
                    )}
                  </div>

                  {/* Connecting line (only if not last step) */}
                  {!isLast && (
                    <div className="absolute top-5 left-1/2 w-full h-0.5 z-10 flex">
                      {/* Background line */}
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: colors.background.secondary }}
                      />

                      {/* Progress line */}
                      <div
                        className={cn(
                          "absolute top-0 left-0 h-full transition-all duration-700 ease-out",
                          isCompleted ? "w-full" : "w-0"
                        )}
                        style={{
                          backgroundColor: colors.buttons.primary.background,
                        }}
                      />
                    </div>
                  )}

                  {/* Step label */}
                  <span
                    className={cn(
                      "text-sm font-medium text-center whitespace-nowrap",
                      isActive && "font-semibold"
                    )}
                    style={{
                      color:
                        isCompleted || isActive
                          ? colors.text.primary
                          : colors.text.secondary,
                    }}
                  >
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile version */}
      <div className="md:hidden px-4">
        <div className="max-w-sm mx-auto">
          <div className="relative flex items-center">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              const isLast = index === steps.length - 1;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center relative flex-1"
                >
                  {/* Step circle */}
                  <div
                    className="relative z-20 w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300 border-2"
                    style={{
                      backgroundColor:
                        isCompleted || isActive
                          ? colors.buttons.primary.background
                          : colors.background.primary,
                      borderColor:
                        isCompleted || isActive
                          ? colors.buttons.primary.background
                          : colors.background.secondary,
                      boxShadow: isActive
                        ? `0 0 0 3px ${colors.buttons.primary.background}25`
                        : "0 1px 2px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                    ) : (
                      <span
                        className="text-xs font-semibold"
                        style={{
                          color: isActive
                            ? colors.buttons.primary.text
                            : colors.text.secondary,
                        }}
                      >
                        {step.id}
                      </span>
                    )}
                  </div>

                  {/* Connecting line (only if not last step) */}
                  {!isLast && (
                    <div className="absolute top-4 left-1/2 w-full h-0.5 z-10 flex">
                      {/* Background line */}
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: colors.background.secondary }}
                      />

                      {/* Progress line */}
                      <div
                        className={cn(
                          "absolute top-0 left-0 h-full transition-all duration-700 ease-out",
                          isCompleted ? "w-full" : "w-0"
                        )}
                        style={{
                          backgroundColor: colors.buttons.primary.background,
                        }}
                      />
                    </div>
                  )}

                  {/* Step label */}
                  <span
                    className={cn(
                      "text-xs font-medium text-center whitespace-nowrap",
                      isActive && "font-semibold"
                    )}
                    style={{
                      color:
                        isCompleted || isActive
                          ? colors.text.primary
                          : colors.text.secondary,
                    }}
                  >
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
