'use client';

import { useState } from 'react';
import { User, Lock, CreditCard, Bell, ChevronDown } from 'lucide-react';

const menuItems = [
  { id: 'personal', label: 'Personal info', icon: User },
  { id: 'security', label: 'Login & Security', icon: Lock },
  { id: 'payment', label: 'Payment methods', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell }
];

export default function AccountSettings() {
  const [activeSection, setActiveSection] = useState('personal');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfo />;
      case 'security':
        return <LoginSecurity />;
      case 'payment':
        return <PaymentMethods />;
      case 'notifications':
        return <Notifications />;
      default:
        return <PersonalInfo />;
    }
  };

  const activeMenuItem = menuItems.find(item => item.id === activeSection);

  return (
    <div className="h-full pb-12 pt-2 bg-[#FCFCFD]">
      {/* Mobile Dropdown */}
      <div className="lg:hidden bg-white pl-3 pr-2 py-2 border-2 border-[#E6E8EC] rounded-xl sticky top-0 mx-4 mt-4 z-50">
        <div className="px-4 py-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              {activeMenuItem && <activeMenuItem.icon className="w-5 h-5 text-gray-600" />}
              <span className="font-medium text-sm text-[#23262F]">{activeMenuItem?.label}</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-500 border-2 border-[#E6E8EC] rounded-full  transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {mobileMenuOpen && (
            <div className="mt-8 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-colors ${
                    activeSection === item.id
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-[#E6E8EC] px-8 py-12">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-colors ${
                      activeSection === item.id
                        ? 'bg-gray-100 text-black'
                        : 'text-[#777E90] hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-bold font-dm-sans text-sm">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

function PersonalInfo() {
  return (
    <div className=" lg:pl-12">
      <div className="flex flex-row items-center justify-between mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#23262F] font-dm-sans mb-4 sm:mb-0">Personal info</h1>
        <button className="px-6 py-2 text-sm font-bold font-dm-sans text-[#23262F] bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors w-fit">
          View profile
        </button>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-[16px] font-medium text-[#23262F] mb-6">Account info</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#B1B5C3] uppercase tracking-wider mb-2">
                Name
              </label>
              <input
                type="text"
                defaultValue="Faisal Ahmed"
                className="w-full px-4 py-3 bg-white border-2 border-[#E6E8EC] rounded-xl text-gray-900 focus:outline-none  transition-shadow"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-[#B1B5C3] uppercase tracking-wider mb-2">
                Display name / Username
              </label>
              <input
                type="text"
                placeholder="Enter your display name"
                className="w-full px-4 py-3 bg-white border-2 border-[#E6E8EC] rounded-xl text-[#141416] focus:outline-none  transition-shadow"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-xs font-bold text-[#B1B5C3] uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="f.ahmed@gmail.com"
                className="w-full px-4 py-3 bg-white border-2 border-[#E6E8EC] rounded-xl text-gray-900 focus:outline-none  transition-shadow"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-[#B1B5C3] uppercase tracking-wider mb-2">
                Phone
              </label>
              <input
                type="tel"
                defaultValue="+966 55 555 5555"
                className="w-full px-4 py-3 bg-white border-2 border-[#E6E8EC] rounded-xl text-gray-900 focus:outline-none  transition-shadow"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-xs font-bold text-[#B1B5C3] uppercase tracking-wider mb-2">
              Bio
            </label>
            <textarea
              placeholder="Write aout yourself in a few words"
              rows={6}
              className="w-full px-4 py-3 bg-white border-2 border-[#E6E8EC] rounded-xl text-[#141416] focus:outline-none  transition-shadow resize-none"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-xs font-bold text-[#B1B5C3] uppercase tracking-wider mb-2">
                Lives in
              </label>
              <div className="relative">
                <select className="w-full px-4 py-3 bg-white border-2 border-[#E6E8EC] rounded-xl text-gray-900 focus:outline-none  transition-shadow appearance-none">
                  <option>Riyadh, Saudi Arabia</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#777E90] border-2 border-[#E6E8EC] rounded-full  pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-[#B1B5C3] uppercase tracking-wider mb-2">
                Speaks
              </label>
              <div className="relative">
                <select className="w-full px-4 py-3 bg-white border-2 border-[#E6E8EC] rounded-xl text-gray-900 focus:outline-none  transition-shadow appearance-none">
                  <option>English, Arabic</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#777E90] border-2 border-[#E6E8EC] rounded-full pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button className="px-6 py-3 bg-[#3B71FE] text-white font-bold text-base font-dm-sans rounded-full hover:bg-blue-700 transition-colors">
            Update profile
          </button>
          <button className="px-8 py-3 text-[#777E90] font-bold font-dm-sans text-base hover:text-gray-900 transition-colors flex items-center justify-center gap-2">
            <span className="text-xl">×</span>
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}

function LoginSecurity() {
  return (
    <div className="lg:pl-12">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#23262F] font-dm-sans mb-8 lg:mb-16 ">Login & Security</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-[#23262F] mb-6">Login</h2>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 pb-12 mb-12 border-b border-gray-200">
            <div>
              <p className="font-medium text-sm text-black">Phone number</p>
              <p className="text-xs font-normal text-[#777E90] mt-2">Last updated 1 month ago</p>
            </div>
            <button className="mt-4 sm:mt-0 px-4 py-3 text-sm font-bold font-dm-sans  text-[#23262F]  border-2 border-[#E6E8EC] rounded-full hover:bg-gray-50 transition-colors w-fit">
              Update mobile number
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#23262F] mb-6">Current Devices</h2>
          
          <div className="space-y-4">
            <div className="flex flex-row items-center justify-between py-4 border-b border-gray-200">
              <div>
                <p className="font-medium text-sm text-black">Session</p>
                <p className="text-xs font-normal text-[#777E90] mt-2">May 14, 2021 at 08:36pm</p>
              </div>
              <button className="mt-4 sm:mt-0 px-4 py-3 text-sm font-bold font-dm-sans  text-[#23262F]  border-2 border-[#E6E8EC] rounded-full hover:bg-gray-50 transition-colors w-fit">
                Log out device
              </button>
            </div>

            <div className="flex flex-row items-center justify-between py-4 border-b border-gray-200">
              <div>
                <p className="font-medium text-sm text-black">macOS Big Sur. Chrome</p>
                <p className="text-xs font-normal text-[#777E90] mt-2">May 14, 2021 at 08:36pm</p>
              </div>
              <button className="mt-4 sm:mt-0 px-4 py-3 text-sm font-bold font-dm-sans  text-[#23262F]  border-2 border-[#E6E8EC] rounded-full hover:bg-gray-50 transition-colors w-fit">
                Log out device
              </button>
            </div>

            <div className="flex flex-row items-center justify-between py-4 border-b border-gray-200">
              <div>
                <p className="font-medium text-sm text-black">Session</p>
                <p className="text-xs font-normal text-[#777E90] mt-2">May 14, 2021 at 08:36pm</p>
              </div>
              <button className="mt-4 sm:mt-0 px-4 py-3 text-sm font-bold font-dm-sans  text-[#23262F]  border-2 border-[#E6E8EC] rounded-full hover:bg-gray-50 transition-colors w-fit">
                Log out device
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentMethods() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [isDefaultCard, setIsDefaultCard] = useState(true);

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(formatCardNumber(value));
    }
  };

  const isCardValid = cardNumber.replace(/\s/g, '').length === 16;

  if (showAddForm) {
    return (
      <div className="lg:pl-12">
        <button
          onClick={() => setShowAddForm(false)}
          className="flex items-center gap-2 px-4 py-3 text-sm font-bold  font-dm-sans text-[#23262F] bg-white border-2 border-[#E6E8EC] rounded-full hover:bg-gray-50 transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Go back
        </button>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#23262F] font-dm-sans mb-8 lg:mb-16">Add a new method</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold font-dm-sans text-[#B1B5C3] uppercase tracking-wider mb-2">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="9224 1111 2222 3333"
                className={`w-full px-4 py-3 bg-white border-2 rounded-xl text-gray-900 focus:outline-none  transition-all ${
                  isCardValid
                    ? 'border-green-500 focus:ring-green-200'
                    : 'border-[#E6E8EC] '
                }`}
              />
              {isCardValid && (
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold font-dm-sans text-[#B1B5C3] uppercase tracking-wider mb-2">
              Card Holder
            </label>
            <input
              type="text"
              defaultValue="Faisal Ahmed"
              className="w-full px-4 py-3 bg-white border-2 border-[#E6E8EC] rounded-xl text-gray-900 focus:outline-none   transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold font-dm-sans text-[#B1B5C3] uppercase tracking-wider mb-2">
                Expiration Date
              </label>
              <input
                type="text"
                placeholder="07 / 28"
                className="w-full px-4 py-3 bg-white border-2 border-[#E6E8EC] rounded-xl text-gray-900 focus:outline-none   transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold font-dm-sans text-[#B1B5C3] uppercase tracking-wider mb-2">
                CVC
              </label>
              <input
                type="password"
                placeholder="•••"
                maxLength="3"
                className="w-full px-4 py-3 bg-white border-2 border-[#E6E8EC] rounded-xl text-gray-900 focus:outline-none   transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setIsDefaultCard(!isDefaultCard)}
              className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                isDefaultCard ? 'bg-blue-600' : 'bg-white border-2 border-gray-300'
              }`}
            >
              {isDefaultCard && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <label className="text-sm font-medium text-[#141416] cursor-pointer" onClick={() => setIsDefaultCard(!isDefaultCard)}>
              Make it my default card
            </label>
          </div>

          <button className="px-6 py-3 bg-[#3B71FE] text-white font-bold font-dm-sans text-base rounded-full hover:bg-blue-700 transition-colors mt-8">
            Add payment method
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-12">
      <div className="flex flex-col sm:flex-row items-start justify-between mb-6 lg:mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#23262F] font-dm-sans mb-8 lg:mb-16">Payment methods</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-3 bg-[#3B71FE] text-white font-bold font-dm-sans text-sm rounded-full hover:bg-blue-700 transition-colors w-fit"
        >
          Add payment method
        </button>
      </div>

      <div className="space-y-4">
        {/* Mastercard 1 */}
        <div className="relative border-b border-[#E6E8EC]  p-6  transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-[80px] h-[48px] bg-white rounded-[9px] border border-[#E6E8EC] flex items-center justify-center flex-shrink-0">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-red-500 opacity-80"></div>
                <div className="w-5 h-5 rounded-full bg-orange-400 -ml-2"></div>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-medium  text-black text-sm">Mastercard ••••••1667</p>
              <p className="text-xs text-[#777E90] mt-0.5">Expiration: 03/2054</p>
            </div>
            <button
              onClick={() => setOpenMenu(openMenu === 1 ? null : 1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="6" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="12" cy="18" r="1.5" />
              </svg>
            </button>
          </div>
          {openMenu === 1 && (
            <div className="absolute right-6 top-16 bg-[#FCFCFD] border border-[#E6E8EC] rounded-[20px] shadow-lg py-3 px-4 z-10 min-w-[180px]">
              <button className="w-full px-4 py-2 text-start text-sm text-[#777E90] font-bold font-dm-sans hover:bg-gray-50 transition-colors">
                Make default
              </button>
<hr className='my-2 text-[#E6E8EC]'/>
              <button className="w-full px-4 py-2 text-start text-sm text-[#777E90] font-bold font-dm-sans hover:bg-gray-50 transition-colors">
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Mastercard 2 */}
        <div className="relative border-b border-[#E6E8EC]  p-6  transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-[80px] h-[48px] bg-white rounded-[9px] border border-[#E6E8EC] flex items-center justify-center flex-shrink-0">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-red-500 opacity-80"></div>
                <div className="w-5 h-5 rounded-full bg-orange-400 -ml-2"></div>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-medium  text-black text-sm">Mastercard ••••••1667</p>
              <p className="text-xs text-[#777E90] mt-0.5">Expiration: 03/2054</p>
            </div>
            <button
              onClick={() => setOpenMenu(openMenu === 2 ? null : 2)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="6" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="12" cy="18" r="1.5" />
              </svg>
            </button>
          </div>
          {openMenu === 2 && (
            <div className="absolute right-6 top-16 bg-[#FCFCFD] border border-[#E6E8EC] rounded-[20px] shadow-lg py-3 px-4 z-10 min-w-[180px]">
              <button className="w-full px-4 py-2 text-start text-sm text-[#777E90] font-bold font-dm-sans hover:bg-gray-50 transition-colors">
                Make default
              </button>
<hr className='my-2 text-[#E6E8EC]'/>
              <button className="w-full px-4 py-2 text-start text-sm text-[#777E90] font-bold font-dm-sans hover:bg-gray-50 transition-colors">
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Visa */}
        <div className="relative border-b border-[#E6E8EC]  p-6  transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-[80px] h-[48px] bg-white rounded-[9px] border border-[#E6E8EC] flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold text-lg">VISA</span>
            </div>
            <div className="flex-1">
              <p className="font-medium  text-black text-sm">Visa ••••••2832</p>
              <p className="text-xs text-[#777E90] mt-0.5">Expiration: 05/2034</p>
            </div>
            <button
              onClick={() => setOpenMenu(openMenu === 3 ? null : 3)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="6" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="12" cy="18" r="1.5" />
              </svg>
            </button>
          </div>
          {openMenu === 3 && (
            <div className="absolute right-6 top-16 bg-[#FCFCFD] border border-[#E6E8EC] rounded-[20px] shadow-lg py-3 px-4 z-10 min-w-[180px]">
              <button className="w-full px-4 py-2 text-start text-sm text-[#777E90] font-bold font-dm-sans hover:bg-gray-50 transition-colors">
                Make default
              </button>
<hr className='my-2 text-[#E6E8EC]'/>
              <button className="w-full px-4 py-2 text-start text-sm text-[#777E90] font-bold font-dm-sans hover:bg-gray-50 transition-colors">
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Tabby */}
        <div className="relative border-b border-[#E6E8EC]  p-6  transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-[80px] h-[48px]  rounded-[9px] border border-[#E6E8EC]  bg-emerald-400  flex items-center justify-center flex-shrink-0">
              <span className="text-gray-900 font-bold text-xl">t</span>
            </div>
            <div className="flex-1">
              <p className="font-medium  text-black text-sm">Tabby</p>
              <p className="text-xs text-[#777E90] mt-0.5">fais••••••@gmail.com</p>
            </div>
            <button
              onClick={() => setOpenMenu(openMenu === 4 ? null : 4)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="6" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="12" cy="18" r="1.5" />
              </svg>
            </button>
          </div>
          {openMenu === 4 && (
            <div className="absolute right-6 top-16 bg-[#FCFCFD] border border-[#E6E8EC] rounded-[20px] shadow-lg py-3 px-4 z-10 min-w-[180px]">
              <button className="w-full px-4 py-2 text-start text-sm text-[#777E90] font-bold font-dm-sans hover:bg-gray-50 transition-colors">
                Make default
              </button>
<hr className='my-2 text-[#E6E8EC]'/>
              <button className="w-full px-4 py-2 text-start text-sm text-[#777E90] font-bold font-dm-sans hover:bg-gray-50 transition-colors">
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Tamara */}
        <div className="relative border-b border-[#E6E8EC]  p-6  transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-[80px] h-[48px] bg-white rounded-[9px] border border-[#E6E8EC] flex items-center justify-center flex-shrink-0">
              <span className="text-gray-900 font-bold text-sm">tamara</span>
            </div>
            <div className="flex-1">
              <p className="font-medium  text-black text-sm">Tamara</p>
              <p className="text-xs text-[#777E90] mt-0.5">fais••••••@gmail.com</p>
            </div>
            <button
              onClick={() => setOpenMenu(openMenu === 5 ? null : 5)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="6" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="12" cy="18" r="1.5" />
              </svg>
            </button>
          </div>
          {openMenu === 5 && (
            <div className="absolute right-6 top-16 bg-[#FCFCFD] border border-[#E6E8EC] rounded-[20px] shadow-lg py-3 px-4 z-10 min-w-[180px]">
              <button className="w-full px-4 py-2 text-start text-sm text-[#777E90] font-bold font-dm-sans hover:bg-gray-50 transition-colors">
                Make default
              </button>
<hr className='my-2 text-[#E6E8EC]'/>
              <button className="w-full px-4 py-2 text-start text-sm text-[#777E90] font-bold font-dm-sans hover:bg-gray-50 transition-colors">
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Notifications() {
  const [notifications, setNotifications] = useState({
    bookingConfirmation1: true,
    stayReminder1: true,
    stayReminder2: true,
    stayReminder3: true,
    bookingConfirmation2: true,
    stayReminder4: true,
    stayReminder5: true,
    stayReminder6: true,
    bookingConfirmation3: true,
    stayReminder7: true,
    stayReminder8: true,
    stayReminder9: true,
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetAll = () => {
    setNotifications({
      bookingConfirmation1: false,
      stayReminder1: false,
      stayReminder2: false,
      stayReminder3: false,
      bookingConfirmation2: false,
      stayReminder4: false,
      stayReminder5: false,
      stayReminder6: false,
      bookingConfirmation3: false,
      stayReminder7: false,
      stayReminder8: false,
      stayReminder9: false,
    });
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
        checked ? 'bg-[#3B71FE]' : 'bg-[#E6E8EC]'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full  transition-transform ${
          checked ? 'translate-x-7 bg-[#E6E8EC]' : 'translate-x-1 bg-[#3B71FE]'
        }`}
      />
    </button>
  );

  return (
    <div className="lg:pl-12">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#23262F] font-dm-sans mb-8 lg:mb-16">Notification Preferences</h1>

      <div className="space-y-8">
        {/* Booking Updates Section */}
        <div>
          <h2 className="text-2xl font-semibold  text-[#23262F]  mb-6">Booking Updates</h2>
          <div className='space-y-6'>
            <div className="flex items-start justify-between border-b border-[#E6E8EC] pb-6 ">
              <div className="flex-1">
                <p className="text-base font-medium text-[#23262F]">Booking Confirmations</p>
                <p className="text-xs text-[#777E90] mt-1">Alerts for your reservations.</p>
              </div>
              <ToggleSwitch
                checked={notifications.bookingConfirmation1}
                onChange={() => toggleNotification('bookingConfirmation1')}
              />
            </div>

            <div className="flex items-start justify-between border-b border-[#E6E8EC] pb-6 ">
              <div className="flex-1">
                <p className="text-base font-medium text-[#23262F]">Stay Reminders</p>
                <p className="text-xs text-[#777E90] mt-1">Receieve notifications via mobile phone</p>
              </div>
              <ToggleSwitch
                checked={notifications.stayReminder1}
                onChange={() => toggleNotification('stayReminder1')}
              />
            </div>

            <div className="flex items-start justify-between border-b border-[#E6E8EC] pb-6 ">
              <div className="flex-1">
                <p className="text-base font-medium text-[#23262F]">Stay Reminders</p>
                <p className="text-xs text-[#777E90] mt-1">Receieve notifications via mobile phone</p>
              </div>
              <ToggleSwitch
                checked={notifications.stayReminder2}
                onChange={() => toggleNotification('stayReminder2')}
              />
            </div>

            <div className="flex items-start justify-between border-b border-[#E6E8EC] pb-6 ">
              <div className="flex-1">
                <p className="text-base font-medium text-[#23262F]">Stay Reminders</p>
                <p className="text-xs text-[#777E90] mt-1">Receieve notifications via mobile phone</p>
              </div>
              <ToggleSwitch
                checked={notifications.stayReminder3}
                onChange={() => toggleNotification('stayReminder3')}
              />
            </div>
          </div>
        </div>

        {/* Personalized Discoveries Section */}
        <div>
          <h2 className="text-2xl font-semibold  text-[#23262F]  mb-6">Personalized Discoveries</h2>
          <div className="space-y-6">
            <div className="flex items-start justify-between border-b border-[#E6E8EC] pb-6 ">
              <div className="flex-1">
                <p className="text-base font-medium text-[#23262F]">Booking Confirmations</p>
                <p className="text-xs text-[#777E90] mt-1">Alerts for your reservations.</p>
              </div>
              <ToggleSwitch
                checked={notifications.bookingConfirmation2}
                onChange={() => toggleNotification('bookingConfirmation2')}
              />
            </div>

            <div className="flex items-start justify-between border-b border-[#E6E8EC] pb-6 ">
              <div className="flex-1">
                <p className="text-base font-medium text-[#23262F]">Stay Reminders</p>
                <p className="text-xs text-[#777E90] mt-1">Receieve notifications via mobile phone</p>
              </div>
              <ToggleSwitch
                checked={notifications.stayReminder4}
                onChange={() => toggleNotification('stayReminder4')}
              />
            </div>

            <div className="flex items-start justify-between border-b border-[#E6E8EC] pb-6 ">
              <div className="flex-1">
                <p className="text-base font-medium text-[#23262F]">Stay Reminders</p>
                <p className="text-xs text-[#777E90] mt-1">Receieve notifications via mobile phone</p>
              </div>
              <ToggleSwitch
                checked={notifications.stayReminder5}
                onChange={() => toggleNotification('stayReminder5')}
              />
            </div>

            <div className="flex items-start justify-between border-b border-[#E6E8EC] pb-6 ">
              <div className="flex-1">
                <p className="text-base font-medium text-[#23262F]">Stay Reminders</p>
                <p className="text-xs text-[#777E90] mt-1">Receieve notifications via mobile phone</p>
              </div>
              <ToggleSwitch
                checked={notifications.stayReminder6}
                onChange={() => toggleNotification('stayReminder6')}
              />
            </div>
          </div>
        </div>

        {/* Account & Support Section */}
        <div>
          <h2 className="text-2xl font-semibold  text-[#23262F]  mb-6">Account & Support</h2>
          <div className="space-y-6">
            <div className="flex items-start justify-between border-b border-[#E6E8EC] pb-6 ">
              <div className="flex-1">
                <p className="text-base font-medium text-[#23262F]">Booking Confirmations</p>
                <p className="text-xs text-[#777E90] mt-1">Alerts for your reservations.</p>
              </div>
              <ToggleSwitch
                checked={notifications.bookingConfirmation3}
                onChange={() => toggleNotification('bookingConfirmation3')}
              />
            </div>

            <div className="flex items-start justify-between border-b border-[#E6E8EC] pb-6 ">
              <div className="flex-1">
                <p className="text-base font-medium text-[#23262F]">Stay Reminders</p>
                <p className="text-xs text-[#777E90] mt-1">Receieve notifications via mobile phone</p>
              </div>
              <ToggleSwitch
                checked={notifications.stayReminder7}
                onChange={() => toggleNotification('stayReminder7')}
              />
            </div>

            <div className="flex items-start justify-between border-b border-[#E6E8EC] pb-6 ">
              <div className="flex-1">
                <p className="text-base font-medium text-[#23262F]">Stay Reminders</p>
                <p className="text-xs text-[#777E90] mt-1">Receieve notifications via mobile phone</p>
              </div>
              <ToggleSwitch
                checked={notifications.stayReminder8}
                onChange={() => toggleNotification('stayReminder8')}
              />
            </div>

            <div className="flex items-start justify-between border-b border-[#E6E8EC] pb-6 ">
              <div className="flex-1">
                <p className="text-base font-medium text-[#23262F]">Stay Reminders</p>
                <p className="text-xs text-[#777E90] mt-1">Receieve notifications via mobile phone</p>
              </div>
              <ToggleSwitch
                checked={notifications.stayReminder9}
                onChange={() => toggleNotification('stayReminder9')}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-4 pt-4">
          <button className="px-6 py-3 bg-[#3B71FE] text-white font-bold font-dm-sans text-base rounded-full hover:bg-blue-700 transition-colors">
            Update
          </button>
          <button
            onClick={resetAll}
            className="px-8 py-3 text-[#777E90] font-bold font-dm-sans text-base hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-xl font-[100]">×</span>
            Reset all
          </button>
        </div>
      </div>
    </div>
  );
}