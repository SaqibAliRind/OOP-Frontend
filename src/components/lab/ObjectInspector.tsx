import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Play, ChevronDown, ChevronRight, Lock, Unlock, ArrowRight, Info, Zap, Clock, RotateCcw } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button, Input } from '@/components/ui';
import type { ObjectInstance, ClassBlueprint, LearningCallout as LearningCalloutType, StateChangeEvent } from '@/types/oopLab';

interface ObjectInspectorProps {
  selectedObject: ObjectInstance | null;
  allObjects: ObjectInstance[];
  classBlueprint: ClassBlueprint | null;
  language: 'english' | 'romanUrdu';
  onCallMethod: (objectId: string, methodName: string) => void;
  onSetProperty: (objectId: string, propertyName: string, value: string) => void;
  onSelectObject: (objectId: string | null) => void;
  onShowCallout?: (callout: LearningCalloutType) => void;
  onUndo?: () => void;
  methodExecuting?: string | null;
  lastExecutedMethod?: { methodName: string; objectId: string; timestamp: number } | null;
  stateHistory?: StateChangeEvent[];
  changedProperty?: { objectId: string; propertyName: string; newValue: string } | null;
  className?: string;
}

export function ObjectInspector({
  selectedObject,
  allObjects,
  classBlueprint,
  language,
  onCallMethod,
  onSetProperty,
  onSelectObject,
  onShowCallout,
  onUndo,
  methodExecuting,
  lastExecutedMethod,
  stateHistory,
  changedProperty,
  className,
}: ObjectInspectorProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    state: true,
    behavior: true,
    history: false,
  });
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});
  const [methodCooldown, setMethodCooldown] = useState<string | null>(null);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleMethodCall = useCallback((methodName: string) => {
    if (!selectedObject || methodCooldown) return;

    setMethodCooldown(methodName);
    onCallMethod(selectedObject.id, methodName);

    cooldownTimerRef.current = setTimeout(() => {
      setMethodCooldown(null);
    }, 1500);
  }, [selectedObject, methodCooldown, onCallMethod]);

  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    };
  }, []);

  const handlePropertyChange = (propertyName: string, value: string) => {
    setEditingValues((prev) => ({ ...prev, [propertyName]: value }));
  };

  const handlePropertyBlur = (propertyName: string) => {
    if (!selectedObject) return;
    const value = editingValues[propertyName];
    if (value !== undefined) {
      onSetProperty(selectedObject.id, propertyName, value);
    }
  };

  const handleObjectSelect = useCallback((objectId: string) => {
    onSelectObject(objectId);
    if (onShowCallout) {
      onShowCallout({
        type: 'concept' as const,
        title: 'Object Selected!',
        message: language === 'romanUrdu'
          ? 'Aap ne Object par click kiya. Object ek real instance hai jo Class blueprint se banta hai. Har object ki apni state (properties) aur actions (methods) hote hain.'
          : 'You selected an Object. An object is a real instance created from a Class blueprint. Each object has its own state and can perform actions.',
        messageUrdu: 'Aap ne Object par click kiya. Object ek real instance hai jo Class blueprint se banta hai. Har object ki apni state (properties) aur actions (methods) hote hain.',
      });
    }
  }, [onSelectObject, onShowCallout, language]);

  const showReferenceEducation = () => {
    if (onShowCallout) {
      onShowCallout({
        type: 'concept' as const,
        title: 'Reference = Address',
        message: language === 'romanUrdu'
          ? `"${selectedObject?.variableName}" object NAHI hai. Ye ek reference (pointer) hai jo object ka memory address store karta hai.`
          : `"${selectedObject?.variableName}" is NOT the object. It is a reference (pointer) that stores the object's memory address.`,
        messageUrdu: `"${selectedObject?.variableName}" object NAHI hai. Ye ek reference (pointer) hai jo object ka memory address store karta hai. Isko ghar ke address ki tarah samjhein.`,
        expandable: true,
        expandedMessage: 'When you write Student s1 = new Student(); — "Student s1" creates the reference, "new Student()" creates the actual object in heap memory, and "=" connects them.',
        expandedMessageUrdu: 'Jab aap likhte hain Student s1 = new Student(); — "Student s1" reference banata hai, "new Student()" heap memory mein actual object banata hai, aur "=" dono ko connect karta hai.',
      });
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col h-full rounded-xl border border-white/10 overflow-hidden',
        'bg-[#0d1320] shadow-lg',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02] shrink-0">
        <Box className="w-3.5 h-3.5 text-blue-400" />
        <span className="text-[10px] font-bold tracking-[0.15em] text-white/40 uppercase">
          {language === 'romanUrdu' ? 'Object Inspector' : 'OBJECT INSPECTOR'}
        </span>
      </div>

      {/* Reference Switcher */}
      {allObjects.length > 1 && (
        <div className="px-3 py-2 border-b border-white/5 bg-white/[0.01]">
          <div className="flex items-center gap-1.5 mb-1.5">
            <ArrowRight className="w-3 h-3 text-blue-400/60" />
            <span className="text-[9px] font-bold tracking-[0.1em] text-white/30 uppercase">
              {language === 'romanUrdu' ? 'References' : 'REFERENCES'}
            </span>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {allObjects.map((obj) => (
              <button
                key={obj.id}
                onClick={() => handleObjectSelect(obj.id)}
                className={cn(
                  'flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono transition-all',
                  selectedObject?.id === obj.id
                    ? 'bg-blue-500/20 border border-blue-500/40 text-blue-300'
                    : 'bg-white/[0.03] border border-white/5 text-white/40 hover:bg-white/[0.06] hover:text-white/60'
                )}
              >
                <span className="font-bold">{obj.variableName}</span>
                <ArrowRight className="w-2.5 h-2.5 text-white/20" />
                <span style={{ color: obj.color }}>#{obj.id.split('-').pop()}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto scrollbar-thin min-h-0">
        <AnimatePresence mode="wait">
          {!selectedObject ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 px-6 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3">
                <Box className="w-5 h-5 text-white/15" />
              </div>
              <p className="text-[12px] text-white/30">
                {language === 'romanUrdu' ? 'Object select karo inspect karne ke liye' : 'Select an object to inspect'}
              </p>
              {allObjects.length > 0 && (
                <p className="text-[10px] text-white/20 mt-2">
                  {allObjects.length} object{allObjects.length > 1 ? 's' : ''} available
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={selectedObject.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4 space-y-3"
            >
              {/* Object Header — Enhanced */}
              <div className="space-y-2.5">
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${selectedObject.color}15` }}
                  >
                    <Box className="w-4 h-4" style={{ color: selectedObject.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-white/90 font-mono">
                        {selectedObject.variableName}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400">
                        {selectedObject.id}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metadata rows */}
                <div className="space-y-1.5 pl-12">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold tracking-wider text-white/25 uppercase w-16">Class:</span>
                    <span className="text-[10px] font-mono text-blue-400">{selectedObject.className}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold tracking-wider text-white/25 uppercase w-16">Reference:</span>
                    <span className="text-[10px] font-mono">
                      <span className="text-cyan-400">{selectedObject.variableName}</span>
                      <span className="text-white/20 mx-1">{'\u2192'}</span>
                      <span className="text-white/50">#{selectedObject.id.split('-').pop()}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold tracking-wider text-white/25 uppercase w-16">Instance Of:</span>
                    <span className="text-[10px] font-mono text-amber-400">{selectedObject.className} class</span>
                  </div>
                </div>
              </div>

              {/* Color bar */}
              <div className="h-0.5 rounded-full" style={{ backgroundColor: selectedObject.color, opacity: 0.3 }} />

              {/* Reference Education Mini-Panel */}
              <div className="rounded-lg border border-cyan-500/10 bg-cyan-500/[0.03] p-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <Info className="w-3 h-3 text-cyan-400" />
                  <span className="text-[9px] font-bold tracking-wider text-cyan-400/80 uppercase">
                    {language === 'romanUrdu' ? 'Reference samjhein' : 'UNDERSTAND REFERENCE'}
                  </span>
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  {language === 'romanUrdu'
                    ? `\u201c${selectedObject.variableName}\u201d ek reference hai \u2014 ye object ka address rakhta hai, object khud nahi.`
                    : `\u201c${selectedObject.variableName}\u201d is a reference \u2014 it holds the object\u2019s address, NOT the object itself.`
                  }
                </p>
                <button
                  onClick={showReferenceEducation}
                  className="mt-1.5 text-[9px] font-semibold text-cyan-400/70 hover:text-cyan-400 transition-colors"
                >
                  {language === 'romanUrdu' ? 'Detail mein samjhein \u2192' : 'Learn more \u2192'}
                </button>
              </div>

              {/* Last Executed Method */}
              {lastExecutedMethod && lastExecutedMethod.objectId === selectedObject.id && (
                <div className="rounded-lg border border-emerald-500/15 bg-emerald-500/[0.03] p-2.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Zap className="w-3 h-3 text-emerald-400" />
                    <span className="text-[9px] font-bold tracking-wider text-emerald-400/80 uppercase">
                      {language === 'romanUrdu' ? 'Last Method' : 'LAST METHOD'}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-white/50">
                    {selectedObject.variableName}.{lastExecutedMethod.methodName}()
                  </p>
                  <p className="text-[9px] text-white/25 mt-0.5">
                    {Math.round((Date.now() - lastExecutedMethod.timestamp) / 1000)}s ago
                  </p>
                </div>
              )}

              {/* STATE Section */}
              <div className="border border-white/5 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('state')}
                  className="flex items-center gap-2 w-full px-3 py-1.5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  {expandedSections.state ? (
                    <ChevronDown className="w-3 h-3 text-white/30" />
                  ) : (
                    <ChevronRight className="w-3 h-3 text-white/30" />
                  )}
                  <span className="text-[10px] font-bold tracking-[0.12em] text-white/40 uppercase">
                    {language === 'romanUrdu' ? 'State' : 'STATE'}
                  </span>
                  <span className="text-[9px] text-white/20 ml-auto">{selectedObject.properties.length} fields</span>
                </button>
                <AnimatePresence>
                  {expandedSections.state && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      <div className="p-3 space-y-1.5">
                        {selectedObject.properties.map((prop) => {
                          const isChanged = changedProperty?.objectId === selectedObject.id && changedProperty?.propertyName === prop.name;
                          return (
                            <div key={prop.name} className={cn(
                              'flex items-center gap-2 p-1 -m-1 rounded transition-all duration-300',
                              isChanged && 'bg-emerald-500/10 ring-1 ring-emerald-500/20'
                            )}>
                              <div className="flex items-center gap-1 min-w-0">
                                {prop.accessModifier === 'private' ? (
                                  <Lock className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                                ) : (
                                  <Unlock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                                )}
                                <span className="text-[10px] font-mono text-blue-400 shrink-0">{prop.type}</span>
                                <span className="text-[10px] font-mono text-white/70 shrink-0">{prop.name}</span>
                              </div>
                              <span className="text-[10px] text-white/20 shrink-0">=</span>
                              <Input
                                value={editingValues[prop.name] ?? prop.value}
                                onChange={(e) => handlePropertyChange(prop.name, e.target.value)}
                                onBlur={() => handlePropertyBlur(prop.name)}
                                className={cn(
                                  'h-6 text-[10px] font-mono px-2 py-0 transition-all duration-300 cursor-text',
                                  'bg-transparent border-transparent hover:bg-black/20 hover:border-white/10 focus:bg-black/20 focus:border-white/10 focus:ring-1 focus:ring-blue-500/50',
                                  isChanged ? 'text-emerald-300' : 'text-white/70'
                                )}
                              />
                              {isChanged && (
                                <span className="text-[8px] font-bold text-emerald-400 animate-pulse">NEW</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* BEHAVIOR Section */}
              <div className="border border-white/5 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('behavior')}
                  className="flex items-center gap-2 w-full px-3 py-1.5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  {expandedSections.behavior ? (
                    <ChevronDown className="w-3 h-3 text-white/30" />
                  ) : (
                    <ChevronRight className="w-3 h-3 text-white/30" />
                  )}
                  <span className="text-[10px] font-bold tracking-[0.12em] text-white/40 uppercase">
                    {language === 'romanUrdu' ? 'Behavior' : 'BEHAVIOR'}
                  </span>
                  <span className="text-[9px] text-white/20 ml-auto">
                    {(classBlueprint?.methods?.length || 2)} methods
                  </span>
                </button>
                <AnimatePresence>
                  {expandedSections.behavior && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      <div className="p-3 space-y-1">
                        {(classBlueprint?.methods || [
                          { name: 'study', returnType: 'void', parameters: [], accessModifier: 'public' as const },
                          { name: 'setInfo', returnType: 'void', parameters: [{ name: 'name', type: 'String' }, { name: 'age', type: 'int' }], accessModifier: 'public' as const },
                        ]).map((method) => {
                          const isExecuting = methodCooldown === method.name || methodExecuting === method.name;
                          return (
                            <div key={method.name} className="flex items-center justify-between gap-2 py-1.5 px-2 rounded-md bg-white/[0.01]">
                              <div className="flex flex-col gap-0.5 min-w-0">
                                <span className="text-[10px] font-mono text-amber-400">
                                  {method.name}({method.parameters.map((p) => `${p.type} ${p.name}`).join(', ')})
                                </span>
                                <span className="text-[9px] text-white/25">
                                  {'\u2192'} {method.returnType}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                  'h-6 px-2 text-[9px] font-semibold transition-all',
                                  isExecuting
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'text-white/40 hover:text-white/70'
                                )}
                                onClick={() => handleMethodCall(method.name)}
                                disabled={methodCooldown !== null}
                              >
                                {isExecuting ? (
                                  <>
                                    <span className="animate-pulse mr-1">EXECUTING</span>
                                    <Zap className="w-2.5 h-2.5 animate-pulse" />
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-2.5 h-2.5 mr-1" />
                                    {language === 'romanUrdu' ? 'Chalao' : 'Run'}
                                  </>
                                )}
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Object Comparison Panel — when 2+ objects exist */}
              {allObjects.length >= 2 && (
                <div className="border border-white/5 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('comparison')}
                    className="flex items-center gap-2 w-full px-3 py-1.5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                  >
                    {expandedSections.comparison ? (
                      <ChevronDown className="w-3 h-3 text-white/30" />
                    ) : (
                      <ChevronRight className="w-3 h-3 text-white/30" />
                    )}
                    <span className="text-[10px] font-bold tracking-[0.12em] text-white/40 uppercase">
                      {language === 'romanUrdu' ? 'Object Comparison' : 'COMPARISON'}
                    </span>
                    <span className="text-[9px] text-white/20 ml-auto">{allObjects.length} objects</span>
                  </button>
                  <AnimatePresence>
                    {expandedSections.comparison && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3">
                          <div className="space-y-2">
                            {allObjects.map((obj) => {
                              const isSelected = obj.id === selectedObject?.id;
                              return (
                                <button
                                  key={obj.id}
                                  onClick={() => onSelectObject(obj.id)}
                                  className={cn(
                                    'w-full text-left p-2 rounded-md border transition-all',
                                    isSelected
                                      ? 'border-blue-500/30 bg-blue-500/[0.06]'
                                      : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]'
                                  )}
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: obj.color }} />
                                    <span className="text-[10px] font-mono font-bold text-white/70">{obj.variableName}</span>
                                    <span className="text-[9px] text-white/20">{'\u2192'}</span>
                                    <span className="text-[9px] font-mono text-white/40">#{obj.id.split('-').pop()}</span>
                                    {isSelected && <span className="text-[8px] text-blue-400 ml-auto">SELECTED</span>}
                                  </div>
                                  <div className="flex gap-3 pl-4">
                                    {obj.properties.map((p) => (
                                      <span key={p.name} className="text-[9px] font-mono text-white/30">
                                        {p.name}={p.value}
                                      </span>
                                    ))}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                          <p className="text-[9px] text-white/25 mt-2 leading-relaxed">
                            {language === 'romanUrdu'
                              ? 'Ye objects alag hain. S1 ka name badalne se S2 par koi asar nahi padta.'
                              : 'These objects are independent. Changing one does not affect the other.'
                            }
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* STATE HISTORY Section */}
              {stateHistory && stateHistory.length > 0 && (
                <div className="border border-white/5 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('history')}
                    className="flex items-center gap-2 w-full px-3 py-1.5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                  >
                    {expandedSections.history ? (
                      <ChevronDown className="w-3 h-3 text-white/30" />
                    ) : (
                      <ChevronRight className="w-3 h-3 text-white/30" />
                    )}
                    <Clock className="w-3 h-3 text-purple-400/60" />
                    <span className="text-[10px] font-bold tracking-[0.12em] text-white/40 uppercase">
                      {language === 'romanUrdu' ? 'State History' : 'STATE HISTORY'}
                    </span>
                    <span className="text-[9px] text-white/20 ml-auto">{stateHistory.length} events</span>
                  </button>
                  <AnimatePresence>
                    {expandedSections.history && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 space-y-2">
                          {onUndo && (
                            <button
                              onClick={onUndo}
                              className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] font-semibold hover:bg-amber-500/20 transition-colors w-full justify-center"
                            >
                              <RotateCcw className="w-2.5 h-2.5" />
                              {language === 'romanUrdu' ? 'Undo Last Action' : 'UNDO LAST ACTION'}
                            </button>
                          )}
                          {stateHistory.slice().reverse().map((event) => (
                            <div key={event.id} className="p-2 rounded-md bg-white/[0.02] border border-white/5">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[8px] font-mono text-purple-400/60">#{event.sequenceNumber}</span>
                                <span className="text-[9px] font-mono text-white/50">
                                  {event.objectName}.{event.methodName}()
                                </span>
                              </div>
                              <div className="flex gap-2 text-[8px] font-mono">
                                <span className="text-white/25">{event.changedProperty}:</span>
                                <span className="text-red-400/60 line-through">{event.previousState.find(s => s.name === event.changedProperty)?.value}</span>
                                <span className="text-white/20">{'\u2192'}</span>
                                <span className="text-emerald-400/80">{event.updatedState.find(s => s.name === event.changedProperty)?.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
