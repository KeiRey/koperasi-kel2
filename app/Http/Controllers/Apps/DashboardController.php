<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Profit;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
      $totalTransactions = Transaction::count();
      $totalCategories = Category::count();
      $totalProducts = Product::count();
      $totalCustomer = Customer::count();

      $currentMonth = Carbon::now();
      $previousMonth = Carbon::now()->subMonth();
      $twoMonthsAgo = Carbon::now()->subMonths(2);

      $transactions = Transaction::whereBetween('created_at', [
          $twoMonthsAgo->startOfMonth(),
          $currentMonth->endOfMonth()
      ])
      ->get()
      ->groupBy(function ($date) {
          return Carbon::parse($date->created_at)->format('Y-m');
      });

      $totalTransactionsPerMonth = [
          $twoMonthsAgo->format('Y-m') => 0,
          $previousMonth->format('Y-m') => 0,
          $currentMonth->format('Y-m') => 0,
      ];

      foreach ($transactions as $month => $trans) {
          $totalTransactionsPerMonth[$month] = $trans->count();
      }

      $profits = Profit::whereBetween('created_at', [
          $twoMonthsAgo->startOfMonth(),
          $currentMonth->endOfMonth()
      ])
      ->get()
      ->groupBy(function ($date) {
          return Carbon::parse($date->created_at)->format('Y-m');
      });

      $totalProfitsPerMonth = [
          $twoMonthsAgo->format('Y-m') => 0,
          $previousMonth->format('Y-m') => 0,
          $currentMonth->format('Y-m') => 0,
      ];

      foreach ($profits as $month => $profit) {
          $totalProfitsPerMonth[$month] = $profit->sum('total'); 
      }

      $cashierTransactions = Transaction::select('cashier_id', \DB::raw('count(*) as total_transactions'))
          ->groupBy('cashier_id')
          ->orderByDesc('total_transactions')
          ->take(5)
          ->get();

      $cashierNames = $cashierTransactions->map(function($transaction) {
          $user = User::find($transaction->cashier_id);
          return [
              'name' => $user ? $user->name : 'Unknown',
              'total_transactions' => $transaction->total_transactions,
          ];
      });


      return Inertia::render('Dashboard/Index', [
          'totalTransactions' => $totalTransactions,
          'totalCategories' => $totalCategories,
          'totalProducts' => $totalProducts,
          'totalCustomer' => $totalCustomer,
          'totalTransactionsPerMonth' => $totalTransactionsPerMonth,
          'totalProfitsPerMonth' => $totalProfitsPerMonth,
          'cashierNames' => $cashierNames,
      ]);

    }
}
